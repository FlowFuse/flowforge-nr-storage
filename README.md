# @flowforge/nr-storage

A Node-RED Storage Plugin for the FlowForge platform.

This plugin provides a complete `storageModule` configuration to tie a Node-RED instance to the FlowForge platform.

### Configuration
```
storageModule: require('@flowforge/nr-storage'),
httpStorage:{
    projectID: process.env['FORGE_PROJECT_ID'],
    baseURL: process.env['FORGE_STORAGE_URL'],
    token: process.env['FORGE_STORAGE_TOKEN']
},
```

 - `projectID` - is the UUID of the project
 - `baseURL` - the root URL for the FlowForge Storage API
 - `token` - authentication token