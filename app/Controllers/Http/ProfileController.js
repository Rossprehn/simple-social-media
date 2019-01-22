'use strict'

const Profile = use('App/Models/Profile')

class ProfileController {
    async home({view}) {

        
        const profiles = await Profile.all();

        return view.render('index', { profiles: profiles.toJSON() })
    }
    async userIndex({view, auth}) {

        // Fetch all user's profiles
        const profiles = await auth.user.profiles().fetch();
        console.log(profiles)

        return view.render('profiles', { profiles: profiles.toJSON() })
    }
 
    async create({ request, response, session, auth}) {
        const profile = request.all();

        const posted = await auth.user.profiles().create({
            user_name: profile.title,
            email: profile.email,
            location: profile.location,
            bio: profile.bio
        });

        session.flash({ message: 'Your profile has been posted!' });
        return response.redirect('back');
    }

    async delete({ response, session, params}) {
        const profile = await Profile.find(params.id);

        await profile.delete();
        session.flash({ message: 'Your profile has been removed'});
        return response.redirect('back');
    }

    async edit({ params, view }) {
        const profile = await Profile.find(params.id);
        return view.render('edit', { profile: profile });
    }

    async update ({ response, request, session, params }) {
        const profile = await Profile.find(params.id);

        profile.title = request.all().title;
        profile.link = request.all().link;
        profile.description = request.all().description;

        await profile.save();

        session.flash({ message: 'Your profile has been updated. '});
        return response.redirect('/post-a-profile');
    }
}

module.exports = ProfileController

