# Additional Service Worker Builder

for https://github.com/angular/universal/issues/1505

⚠️️⚠️️⚠️️This Builder No Long-term Maintenance Plans⚠️️⚠️️⚠️️

## Use

Install the builder package.

```shell script
$ npm i additional-service-worker-builder
```

Add command in `angular.json`.

```json
{
  "architect": {
    "service-work": {
        "builder": "additional-service-worker-builder:service-worker",
        "options": {
          "browserTarget": "<project_name>:build:production"
        }
    }
  }
}
```

Run command to build service worker files.

```shell script
$ ng run <project_name>:service-work
```

Now your destination folder should have these extra files in it.

```txt
.
├── ngsw-worker.js
├── ngsw.json
├── safety-worker.js
└── worker-basic.min.js
```
