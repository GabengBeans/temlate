<style lang="less">
@import "./own-space.less";
</style>

<template>
    <div>
        <Card>
        <p slot="title">
            <Icon type="locked"></Icon>
            修改密码
        </p>
        <div>
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                <FormItem label="原密码" prop="oldPass" :error="oldPassError">
                    <Input style="width:15%;min-width:200px" v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" ></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPass">
                    <Input style="width:15%;min-width:200px" v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" ></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="rePass">
                    <Input style="width:15%;min-width:200px" v-model="editPasswordForm.rePass" placeholder="请再次输入新密码" ></Input>
                </FormItem>
            </Form>
            <div style="text-align:center">
                <Button type="primary"  @click="saveEditPass">保存</Button>
            </div>
        </div>
        </Card>
    </div>
</template>

<script>
//import Cookies from "js-cookie";
import ajax from '@/libs/requestApi'
import url from '@/libs/url'
export default {
  name: "ownspace_index",
  data() {
    const valideRePassword = (rule, value, callback) => {
      if (value !== this.editPasswordForm.newPass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    }
    const valideReOldPassword = (rule,value,callback)=>{
       if (value !== Cookies.get('password')) {
        callback(new Error("密码错误"));
      } else {
        callback();
      }   
    }
    return {
      oldPassError: "",

      editPasswordForm: {
        oldPass: "",
        newPass: "",
        rePass: ""
      },
      passwordValidate: {
        oldPass: [{ required: true, message: "请输入原密码", trigger: "blur" },
        {validator: valideReOldPassword, trigger: "blur" }
        ],
        newPass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, message: "请至少输入6个字符", trigger: "blur" },
          { max: 32, message: "最多输入32个字符", trigger: "blur" }
        ],
        rePass: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: valideRePassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    saveEditPass() {
      this.$refs["editPasswordForm"].validate(valid => {
        if (valid) {
          let params={
            password:this.editPasswordForm.oldPass,
            newPassword:this.editPasswordForm.rePass,
            userId:sessionStorage.getItem('userId')
          }
          ajax.requestPostUrl(url.update_password,params).then(resp=>{
            if(resp.data.success)
            {
              this.editPasswordForm.oldPass=""
              this.editPasswordForm.newPass=""
              this.editPasswordForm.rePass=""
              this.$Message.success("密码修改成功")
            }else{
              this.$Message.error("密码修改失败")
            }
          })
        }
      });
    },
  }
};
</script>


