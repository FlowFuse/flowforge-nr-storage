const got = require('got')

var settings
var appName

module.exports  = {
    init: (nrSettings) => {
        settings = nrSettings.httpStorage || {}

        if (Object.keys(settings) == 0) {
            var err = Promise.reject("No settings for flow storage module found");
            err.catch(err => {});
            return err;
        }

        projectID = settings.projectID;

        console.log(settings)
        console.log(settings.baseURL + "/" + projectID + "/")

        this._client = got.extend({
            prefixUrl: settings.baseURL + "/" + projectID + "/",
            headers: {
                'user-agent': "FlowForge HTTP Storage v0.1", 
                authorization: "Bearer " + settings.token
            },
            timeout: {
                request: 1000
            }
        })

        return Promise.resolve()

    },
    getFlows: async () => {
        return new Promise( async (resolve, reject) => {
            try {
                let flow = await this._client.get('flows').json()
                resolve(flow)
            } catch (e) {
                reject(e)
            }
        })
    },
    saveFlows: async (flow) => {
        return this._client.post('flows',{
            json: flow,
            responseType: 'json'
        })
        
    },
    getCredentials: async () => {
        return new Promise( async (resolve,reject) => {
            try {
                let creds = await this._client.get('credentials').json()
                resolve(creds)
            } catch (e) {
                reject(e)
            }
        })
    },
    saveCredentials: async (credentials) => {
        return this._client.post('credentials',{
            json: credentials,
            responseType: 'json'
        })
    },
    getSettings: () => {
        return new Promise( async (resolve, reject) => {
            try {
                let settings = await this._client.get('settings').json()
                resolve(settings)
            } catch (e) {
                reject(e)
            }
        })
    },
    saveSettings: (settings) => {
       return this._client.post('settings',{
            json: settings,
            responseType: 'json'
        })
    },
    getSessions: () => {
        this._client.get('sessions').json()
    },
    saveSessions: (sessions) => {
        return this._client.post('sessions',{
            json: sessions,
            responseType: 'json'
        })
    },
    getLibraryEntry: (type, name) => {
        return new Promise( async (resolve, reject) => {
            try {
                let entry = await this._client.get('library/' + type, {
                    searchParams: {
                        name: name
                    }
                })
                if (entry.headers['content-type'].startsWith("application/json")) {
                    resolve(JSON.parse(entry.body))
                } else {
                    resolve(entry.body)
                }
            } catch (e) {
                reject(e)
            }
        })
    },
    saveLibraryEntry: (type, name, meta, body) => {
       return this._client.post('library/' + type, {
            json:{
                name: name,
                meta: meta,
                body: body
            },
            responseType: 'json'
        })
    }
}