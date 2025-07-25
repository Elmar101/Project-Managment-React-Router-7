1. add shadcn => `npx shadcn@latest init`

After You need to add @ in tsconfig.json and vite.config.ts

=> tsconfig.json
```
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./app/*"]
    },
  }
```

=> vite.config.ts
```
resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
```

if you have error you check components.json file

components.json should be as follows

```
 "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
```

=> You need to check the app/app.css (@import "tailwindcss"; @import "tw-animate-css";)
=> You need to check the package.json ("@types/node": "^20") if there is not @types/node in package.json file and you run `bun add -D @types/node `

ex: `npx shadcn@latest add button` => after use button

used libs
1. react tanstack query  ```bun add @tanstack/react-query```
2. sonner -> for Toaster```bun add sonner```


e---n----v fayl
BACK_API_URL=http://localhost:5000/api-v1
BACK_SOCKET_URL=http://localhost:5000/socket.io
