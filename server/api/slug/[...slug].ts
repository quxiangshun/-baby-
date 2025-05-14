import { createRouter, defineEventHandler, useBase } from "h3";

const router = createRouter()

router.get('/slugGet', defineEventHandler(() => 'slugGet'))
router.post('/slugPost', defineEventHandler(() => 'slugPos'))

export default useBase('/api/slug', router.handler);

// 嵌套路由
// 浏览器：http://localhost:3000/api/slug/slugGet
// 页面：await useFetch('/api/slug/slugGet');
// 页面：await useFetch('/api/slug/slugPost',{ method: 'post'});