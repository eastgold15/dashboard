## Layouts

Vue components in this dir are used as layouts.

By default, `default.vue` will be used unless an alternative is specified in the route meta.

```vue
<script setup lang="ts">
definePageMeta({
  layout: 'home',
})
</script>
```

Learn more on https://nuxt.com/docs/guide/directory-structure/layouts

### layouts/

|———default.vue # 默认布局
├── stat.vue # 统计报表布局
├── anal.vue # 用水分析布局
├── alarm.vue # 报警管理布局
└── quata.vue # 定额管理布局
