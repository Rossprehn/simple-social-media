'use strict'

const Profile = use('App/Models/Profile')

class ProfileController {
    async home({view}) {

        // Create a profile
        const profile = new Profile;
        profile.user_name = 'My profile name';
        profile.email = 'rossprehn@me.com';
        profile.location = 'this is my location';
        profile.bio = 'this is my bio';

        await profile.save();

        // Fetch a profile
        const profiles = await Profile.all();

        return view.render('index', { profiles: profiles.toJSON() })
    }
}

module.exports = ProfileController

