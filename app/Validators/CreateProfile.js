'use strict'

class CreateProfile {
  get rules () {
    return {
      user_name: 'required',
      email: 'required',
      location: 'required',
      bio: 'required'
    }
  }
   get messages() {
    return {
      'required': '{{ field }} is required.'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    
    return this.ctx.response.redirect('back');
  }
}

module.exports = CreateProfile
