'use strict'

const Profile = use('App/Models/Profile')

class ProfileController {
    async home({view}) {

        
        const profiles = await Profile.all();

        return view.render('index', { profiles: profiles.toJSON() })
    }
}

module.exports = ProfileController

