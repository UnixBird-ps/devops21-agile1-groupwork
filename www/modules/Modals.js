class Modal {

  static async alert(message, okMessage = 'OK',) {
    // Use the prompt method with type = alert
    return await this.prompt(message, okMessage, false, 'alert');
  }

  static async confirm(message, okMessage = 'OK', cancelMessage = 'Cancel') {
    // Use the prompt method with type = confirm
    return await this.prompt(message, okMessage, cancelMessage, 'confirm');
  }

  static async prompt(message, okMessage = 'OK', cancelMessage = 'Cancel', type = 'prompt', inputType = 'text') {
    // Add html for modal
    $('body').append(`
      <div class="modal">
        <div class="hider"></div>
        <div class="box">
          <p>${message}</p>
          ${type === 'prompt' ? `<input type="${inputType}">` : ''}
          <button class="ok-btn">${okMessage}</button>
          ${type !== 'alert' ? `<button class="cancel-btn">${cancelMessage}</button>` : ''}
        </div>
      </div>
    `);
    return await this.open();
  }

  static open() {
    // Fade in during 1000 ms
    $('.modal').fadeIn(1000);
    // Focus input field
    $('.modal input').focus();
    // Create a promise and return it
    // this means that any method the awaits alert
    // will wait until we call the resolve method
    let resolve, promise = new Promise(r => resolve = r);
    $('.modal .ok-btn').click(() => {
      this.toReturn = $('.modal input').length ? $('.modal input').val() : true;
      this.close();
    });
    $('.modal .cancel-btn').click(() => {
      this.toReturn = $('.modal input').length ? null : false;
      this.close();
    });
    $('.modal input').keyup(e => e.key === 'Enter' && $('.modal .ok-btn').click());
    this.resolve = resolve;
    return promise;
  }

  static async close() {
    // Fade out during 1000 ms
    await $('.modal').fadeOut(1000, () => {
      // Remove modal and resolve promise
      $('.modal').remove();
      this.resolve(this.toReturn);
    });
  }

  static sleep(ms) {
    // Sleep for a number of ms (if called with await)
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}