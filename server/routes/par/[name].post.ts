import {H3Event, H3EventContext} from "h3";
export default defineEventHandler((event:H3Event) => {
    let params = event.context.params as H3EventContext;
    return `service router post ${params.name}`
});