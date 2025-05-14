// 处理body、query、error、设置状态码、runtimeConfig、cookie，以api>[name].post.ts为例子

// 页面：await useFetch('api/apiName',{
//     method: 'post',
//     body: { test: 'body' },
//     query:{ test: 'query' }
// });

import {H3Event, H3EventContext} from "h3";

export default defineEventHandler(async (event:H3Event) => {
    const body = await readBody(event);
    const query = getQuery(event);
    let params = event.context.params as H3EventContext;
    const config = useRuntimeConfig();
    const cookies = parseCookies(event)
    const id = parseInt(params.id) as number;
    // if (!Number.isInteger(id)) {
    //     throw createError({
    //         statusCode: 400,
    //         statusMessage: "错误处理",
    //     })
    // }
    // setResponseStatus(200, '21321')
    return {
        text:`service router post ${params.name}`,
        params,
        body,
        query,
        config,
        cookies
    }
});