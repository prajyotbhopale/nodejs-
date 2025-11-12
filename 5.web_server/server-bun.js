import {serve} from "bun";

serve({
    fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === "/") {
            return new Response("Hello World\n", { status: 200 });
        } else if (url.pathname === "/ice-tea") {
            return new Response("Here is your ice tea!\n", { status: 200 });
        } else{
            return new Response("404 Not Found\n", { status: 404 });
        }
    },

    port: 3000,
    hostname: "127.0.0.1"
})