<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { submitMessage, type ContactFormErrors } from '../api'
import { useReveal } from '../composables/useReveal'

interface FormData {
  name: string
  email: string
  message: string
}

const formData = ref<FormData>({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')
const errors = reactive<ContactFormErrors>({})
const touched = reactive<Record<keyof FormData, boolean>>({
  name: false,
  email: false,
  message: false
})

const isEmailValid = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validate = (): boolean => {
  submitError.value = ''
  errors.name = ''
  errors.email = ''
  errors.message = ''

  if (!formData.value.name.trim()) {
    errors.name = '请输入您的姓名'
  } else if (formData.value.name.trim().length > 100) {
    errors.name = '姓名长度不能超过 100 个字符'
  }

  if (!formData.value.email.trim()) {
    errors.email = '请输入您的邮箱'
  } else if (formData.value.email.trim().length > 255) {
    errors.email = '邮箱长度不能超过 255 个字符'
  } else if (!isEmailValid(formData.value.email.trim())) {
    errors.email = '请输入有效的邮箱地址'
  }

  if (!formData.value.message.trim()) {
    errors.message = '请输入留言内容'
  } else if (formData.value.message.trim().length > 2000) {
    errors.message = '留言内容不能超过 2000 个字符'
  }

  return !errors.name && !errors.email && !errors.message
}

const isFormValid = computed(() => {
  return (
    formData.value.name.trim() &&
    formData.value.email.trim() &&
    formData.value.message.trim() &&
    isEmailValid(formData.value.email.trim())
  )
})

const markTouched = (field: keyof FormData) => {
  touched[field] = true
  validate()
}

const handleSubmit = async () => {
  touched.name = true
  touched.email = true
  touched.message = true

  if (!validate()) {
    return
  }

  isSubmitting.value = true
  submitError.value = ''

  try {
    await submitMessage({
      name: formData.value.name,
      email: formData.value.email,
      message: formData.value.message
    })

    submitSuccess.value = true
    formData.value = { name: '', email: '', message: '' }
    touched.name = false
    touched.email = false
    touched.message = false

    setTimeout(() => {
      submitSuccess.value = false
    }, 3000)
  } catch (error: any) {
    if (error.errors) {
      Object.assign(errors, error.errors)
    }
    submitError.value = error.message || '提交失败，请稍后重试'
  } finally {
    isSubmitting.value = false
  }
}

useReveal()
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="contact-content">
        <div class="contact-left">
          <div class="section-label gsap-section-label">联系我</div>
          <h2 class="section-title gsap-section-title">LET'S<br/>TALK</h2>
          <p class="section-desc gsap-section-desc">
            有任何问题或合作意向，欢迎随时与我联系。我期待与您的交流！
          </p>

          <div class="contact-links">
            <a href="mailto:security@example.com" class="contact-link gsap-stagger-item">
              <span class="link-label">EMAIL</span>
              <span class="link-value">3075810785@qq.com</span>
            </a>
            <a href="#" class="contact-link gsap-stagger-item">
              <span class="link-label">LINKEDIN</span>
              <span class="link-value">Secure Dev</span>
            </a>
            <a href="#" class="contact-link gsap-stagger-item">
              <span class="link-label">B 站</span>
              <span class="link-value">RickQin-Tuana</span>
            </a>
            <a href="#" class="contact-link gsap-stagger-item">
              <span class="link-label">BEHANCE</span>
              <span class="link-value">RickQ_portfolio</span>
            </a>
          </div>
        </div>

        <div class="contact-right gsap-card">
          <form @submit.prevent="handleSubmit" class="contact-form" novalidate>
            <div class="form-group" :class="{ 'has-error': touched.name && errors.name }">
              <label class="form-label">NAME</label>
              <input
                v-model="formData.name"
                type="text"
                placeholder="您的姓名"
                class="form-input"
                maxlength="100"
                @blur="markTouched('name')"
              />
              <span v-if="touched.name && errors.name" class="error-text">{{ errors.name }}</span>
            </div>

            <div class="form-group" :class="{ 'has-error': touched.email && errors.email }">
              <label class="form-label">EMAIL</label>
              <input
                v-model="formData.email"
                type="email"
                placeholder="您的邮箱"
                class="form-input"
                maxlength="255"
                @blur="markTouched('email')"
              />
              <span v-if="touched.email && errors.email" class="error-text">{{ errors.email }}</span>
            </div>

            <div class="form-group" :class="{ 'has-error': touched.message && errors.message }">
              <label class="form-label">MESSAGE</label>
              <textarea
                v-model="formData.message"
                placeholder="留言内容"
                rows="4"
                class="form-textarea"
                maxlength="2000"
                @blur="markTouched('message')"
              ></textarea>
              <span v-if="touched.message && errors.message" class="error-text">{{ errors.message }}</span>
            </div>

            <div v-if="submitError" class="form-error-banner">{{ submitError }}</div>
            <div v-if="submitSuccess" class="form-success-banner">留言提交成功！</div>

            <button
              type="submit"
              class="submit-btn"
              :disabled="isSubmitting || !isFormValid"
            >
              <span v-if="isSubmitting">SENDING...</span>
              <span v-else-if="submitSuccess">SENT!</span>
              <span v-else>SEND MESSAGE</span>
            </button>
          </form>
        </div>
      </div>

      <footer class="footer">
        <div class="footer-content">
          <span class="footer-text">&copy; 2024 xiaoY. All rights reserved.</span>
          <a href="#hero" class="back-to-top">BACK TO TOP &uarr;</a>
        </div>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: var(--section-gap) 0 5rem;
  background: transparent;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;
}

.contact-left {
  padding-top: 0.5rem;
}

.section-label {
  font-family: var(--font-family);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.section-title {
  font-family: var(--font-family);
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: #fff;
  margin: 0 0 2rem;
}

.section-desc {
  font-family: var(--font-family);
  font-size: 1.0625rem;
  font-weight: 400;
  line-height: 1.8;
  color: #999;
  margin: 0 0 4rem;
  max-width: 400px;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-link {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  text-decoration: none;
  transition: all var(--transition-base);
}

.contact-link:hover .link-value {
  color: var(--color-accent);
}

.link-label {
  font-family: var(--font-family);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #666;
  text-transform: uppercase;
}

.link-value {
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  transition: color var(--transition-base);
}

.contact-right {
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-lg);
  padding: 3rem;
  border: 1px solid rgba(255,255,255,0.08);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-family: var(--font-family);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #666;
  text-transform: uppercase;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 1rem 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  border-radius: 0;
  color: #fff;
  font-family: var(--font-family);
  font-size: 1rem;
  transition: border-color var(--transition-base);
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #555;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  width: 100%;
  margin-top: 1rem;
  padding: 1.25rem;
  background: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all var(--transition-base);
}

.submit-btn:hover:not(:disabled) {
  background: var(--color-accent-hover);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.form-group.has-error .form-input,
.form-group.has-error .form-textarea {
  border-color: #ff4d4f;
}

.error-text {
  font-size: 0.75rem;
  color: #ff4d4f;
  margin-top: 0.25rem;
}

.form-error-banner,
.form-success-banner {
  padding: 0.875rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
}

.form-error-banner {
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
  border: 1px solid rgba(255, 77, 79, 0.2);
}

.form-success-banner {
  background: rgba(82, 196, 26, 0.1);
  color: #52c41a;
  border: 1px solid rgba(82, 196, 26, 0.2);
}

.footer {
  margin-top: 8rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-text {
  font-family: var(--font-family);
  font-size: 0.875rem;
  color: #666;
}

.back-to-top {
  font-family: var(--font-family);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #666;
  text-decoration: none;
  text-transform: uppercase;
  transition: color var(--transition-base);
}

.back-to-top:hover {
  color: var(--color-accent);
}

@media (max-width: 1200px) {
  .container {
    padding: 0 2rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .contact-right {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding: 6rem 0 4rem;
  }

  .container {
    padding: 0 1.5rem;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
