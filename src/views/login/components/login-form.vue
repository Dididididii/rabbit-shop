<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="changeMsg" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="changeMsg" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <div class="form"  >
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input @blur="validation('account')" v-model="form.account" name="account" type="text" placeholder="请输入手机号/用户名">
          </div>
          <div class="error" v-if="errors.account"><i class="iconfont icon-warning" />{{errors.account}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input @blur="validation('password')" v-model="form.password" name="password" type="password" placeholder="请输入密码">
          </div>
          <div class="error" v-if="errors.password"><i class="iconfont icon-warning" />{{errors.password}}</div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input @blur="validation('mobile')" v-model="form.mobile" name="mobile" type="text" placeholder="请输入手机号">
          </div>
          <div class="error" v-if="errors.mobile"><i class="iconfont icon-warning" />{{errors.mobile}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input @blur="validation('code')"  v-model="form.code" name="code" type="password" placeholder="请输入验证码">
            <span class="code" @click="send()">{{time===0?'发送验证码':`${time}秒后发送`}}</span>
          </div>
          <div class="error" v-if="errors.code"><i class="iconfont icon-warning" />{{errors.code}}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <xtxCheckboxVue name="isAgree" @change="changeCheck" :check="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="!form.isAgree"><i class="iconfont icon-warning" />请同意协议</div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </div>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>

import positive from '@/utils/vee-validate-schema'

import xtxCheckboxVue from '@/components/library/xtx-checkbox.vue'
import { userAccountLogin, userMobileLoginMsg, userMobileLogin } from '@/api/user'

export default {
  name: 'LoginForm',
  components: { xtxCheckboxVue },
  data () {
    return {
      isMsgLogin: false,
      time: 0,
      form: {
        isAgree: true,
        account: null,
        password: null,
        mobile: null,
        code: null
      },
      errors: {
        mobile: null,
        password: null,
        code: null,
        account: null
      },
      timer: null

    }
  },
  methods: {
    validation (type) {
      if (type === 'mobile') {
        const mes = positive.mobile(this.form.mobile)
        if (mes !== true) {
          this.errors.mobile = mes
        } else {
          this.errors.mobile = null
        }
      } else if (type === 'password') {
        const mes = positive.password(this.form.password)
        if (mes !== true) {
          this.errors.password = mes
        } else {
          this.errors.password = null
        }
      } else if (type === 'code') {
        const mes = positive.code(this.form.code)
        if (mes !== true) {
          this.errors.code = mes
        } else {
          this.errors.code = null
        }
      } else if (type === 'account') {
        const mes = positive.account(this.form.account)
        if (mes !== true) {
          this.errors.account = mes
        } else {
          this.errors.account = null
        }
      }
    },
    changeCheck (e) {
      // console.log(e)
      this.form.isAgree = e
    },
    changeMsg () {
      this.isMsgLogin = !this.isMsgLogin
      this.form = {
        isAgree: true,
        account: null,
        password: null,
        mobile: null,
        code: null
      }
      this.errors = {
        mobile: null,
        password: null,
        code: null,
        account: null
      }
    },
    login () {
      if (this.isMsgLogin === false) {
        this.validation('account')
        this.validation('password')
      } else {
        this.validation('mobile')
        this.validation('code')
      }

      if (this.form.isAgree === true && this.errors.mobile === null && this.errors.password === null && this.errors.code === null && this.errors.account === null) {
        if (this.isMsgLogin === false) {
          // 账号登录
          // console.log(this.form)
          userAccountLogin(this.form).then(data => {
          // 成功
          // 1. 存储信息
            const { id, account, nickname, avatar, token, mobile } = data.result
            this.$store.commit('user/setUser', { id, account, nickname, avatar, token, mobile })
            // 2. 提示
            this.$Message({
              text: '登录成功'
            })
            // 3. 跳转
            this.$router.push(this.$route.query.redirectUrl || '/')
          }).catch(err => {
          // 失败
            this.$Message({
              type: 'error',
              text: err.response.data.message || '登录失败'
            })
          })
        } else {
          // 短信登录
          // 1. 定义两个API  短信登录，获取短信验证码
          // 2. 实现发送短信验证码发送功能
          // 3. 完成手机号短信验证码登录逻辑
          console.log(1)
          userMobileLogin(this.form).then(data => {
            // 成功
            // 1. 存储信息
            const { id, account, nickname, avatar, token, mobile } = data.result
            this.$store.commit('user/setUser', { id, account, nickname, avatar, token, mobile })
            // 2. 提示
            this.$Message({ text: '登录成功' })
            // 3. 跳转
            this.$router.push(this.$route.query.redirectUrl || '/')
          }).catch(err => {
            this.$Message({ type: 'error', text: err.response.data.message || '登录失败' })
          })
        }
      }
    },
    async send () {
      this.validation('mobile')
      if (this.errors.mobile === null) {
        // 通过
        if (this.time === 0) {
        // 没有倒计时才可以发送
          await userMobileLoginMsg(this.form.mobile)
          this.$Message({ type: 'success', text: '发送成功' })
          this.time = 60
          this.timer = setInterval(() => {
            this.time--
            if (this.time === 0) {
              clearInterval(this.timer)
            }
          }, 1000)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>

// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

</style>
