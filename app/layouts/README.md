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
├── sr.vue # 统计报表布局
├── wa.vue # 用水分析布局
├── am.vue # 报警管理布局
└── qm.vue # 定额管理布局
