(function() {
  $(window).on('load', function() {
      var user_name = $('meta[name=page_specific_js]').attr('user_name')
      console.log("user_name: " + user_name)

      if (Notification.permission === "default") {
        Notification.requestPermission();
      }

      App.show_modal = function(id) {
        $( id ).dialog({
          modal: true,
          buttons: {
            Ok: function() {
              $( this ).dialog( "close" );
            }
          }
        });
      }

      App.ws_setup(function(msg) {
          console.log("got msg")
          console.log(msg)
          console.dir(msg)
          if(msg.event == "error") {
            App.show_modal("#unauthorized_message")
            App.ws_disconnect();
          } else if(msg.command == "open_url") {
            console.log("Notification.permission", Notification.permission)
            if (Notification.permission === 'granted') {
              const audio = new Audio('/plugin_assets/redmine_rt/sounds/chime-sound-7143.mp3');
              audio.play().catch(e => console.warn('Autoplay blocked', e));

              console.log("Creating new notification")
              var title = msg.data.title ? msg.data.title : msg.data.url;
              new Notification(title, {
                body: 'Click to open the link',
              }).onclick = () => {
                const win = window.open(msg.data.url, '_blank');
                if (win) win.focus();
              };
            }
          } else {
            console.log("unhandled msg")
          }
      });
  })
}).call(this);
  
