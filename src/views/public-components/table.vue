<template>
<div id='public_table'>
    <Table 
    border  stripe  :columns='columns' :data='data'>
    </Table>
</div>
   
</template>
<script>
export default {
  name: 'public_table',
  props:['columns','data']
};
</script>
<style>
@import '../../styles/publicStyle.less'
</style>
