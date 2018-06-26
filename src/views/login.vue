<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
//import Cookies from "js-cookie";
import ajax from "@/libs/requestApi.js";
import url from "@/libs/url";
import util from '@/libs/util'
export default {
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let params = {
            userName: this.form.userName,
            password: this.form.password
          };

          ajax.requestGet(url.user_login_url, params).then(resp => {
            if (resp.data.success) {
              Cookies.set("user", this.form.userName);
              Cookies.set("password", this.form.password);
              sessionStorage.setItem("token", resp.data.data.token);
              sessionStorage.setItem("userId",resp.data.data.userId)
              //console.log(resp.data.data.token)
              this.$store.commit(
                "setAvator",
                "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
              );
              ajax
                .requestGet(url.query_menus_url, {
                  token: resp.data.data.token
                })
                .then(resp => {
                  if (resp.data.success) {
                    sessionStorage.setItem(
                      "menus",
                      JSON.stringify(resp.data.data)
                    );
                    //console.log(resp.data.data)
                    let menus = util.createMenus(JSON.parse(sessionStorage.getItem('menus')))
                    this.$router.addRoutes(menus)
                    this.$store.state.app.pageOpenedList=[]
                     this.$router.push({ name: "home_index" });
                  }
                });
            } else {
              this.$Message.error("用户名或密码错误");
            }
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
