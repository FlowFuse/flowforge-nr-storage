# @flowforge/nr-storage

A Node-RED Storage Plugin for the FlowForge platform.

This plugin provides:
 - a complete `storageModule` configuration to tie a Node-RED instance to the FlowForge platform.
 - a Library Store plugin that supports team-wide shared libraries in the editor

### Storage Module configuration

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


### Library Store Plugin configuration

```
editorTheme: {
    library: {
        sources: [
            {
                id: "flowforge-team-library",
                type: "flowforge-team-library",
                label: "Team Library",
                icon: "font-awesome/fa-users",
                baseURL: '${settings.storageURL}',
                projectID: '${settings.projectID}',
                libraryID: '${settings.teamID}',
                token: '${settings.projectToken}'
            }
        ]
    }
}
```