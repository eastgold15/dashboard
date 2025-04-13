<script lang="ts" setup>

import { ref } from 'vue'

import type { DataRes, ImageCaptcha } from '~/api/base/index.type'

definePageMeta({
  layout: 'auth',
  alias: ['/auth/login'],
})
const authStore = useMyAuthStore()

// 表单数据
const form = ref({
  username: '',
  password: '',
  captcha: '',
})

// 验证码图片
const captchaImage = ref<string>()
// 获取验证码
const { data: Captcha, refresh } = await useAPI.get<any, DataRes<ImageCaptcha>>('/auth/captcha/img')


captchaImage.value = Captcha.value?.data?.img



// 刷新验证码
function refreshCaptcha() {
  refresh().then((res) => {
    captchaImage.value = Captcha.value?.data?.img
  })
}

// 处理登录
async function handleLogin() {
  const requestOptions = {
    username: form.value.username,
    password: form.value.password,
    captchaId: Captcha.value?.data?.id,
    verifyCode: form.value.captcha,
  }


  const success = await authStore.login(requestOptions)
  if (success) {
    // 登录成功后获取权限
    const permissionStore = useMyPermissionStore()
    await permissionStore.fetchPermissions()

    await navigateTo('/dashboard/index')
  }

}
</script>

<template>
  <div class="login-container">
    <Card class="login-card">
      <template #header>
        <div class="text-center">
          <img src="/logo.png" alt="Logo" class="logo">
          <h1 class="inline-block p-4 text-3xl font-bold">
            欢迎登录
          </h1>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <InputGroup>
            <InputText id="username" v-model="form.username" placeholder="用户名 admin" class="w-full" />
          </InputGroup>

          <InputGroup>
            <Password id="password" v-model="form.password" placeholder="密码 a123456" class="w-full" toggle-mask />
          </InputGroup>

          <InputGroup class="flex items-center gap-2">
            <img :src="captchaImage" alt="验证码" class="captcha-image h-auto max-h-100px" @click="refreshCaptcha">
            <div class="flex items-center">
              <InputText id="captcha" v-model="form.captcha" placeholder="验证码" class="h-36px w-full" />
            </div>
          </InputGroup>

          <Button label="登录" class="w-full" @click="handleLogin" />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg,rgb(65, 28, 134) 0%, #2575fc 100%);
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 40px;
  height: 40px;
  margin-bottom: 1rem;
  display: inline-block;
}

.captcha-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.captcha-image {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.captcha-image:hover {
  opacity: 0.8;
}
</style>
