'use strict';

module.exports = {
  shotImage: function(shot: Object): {uri: ?string} {
    var uri = shot && shot.image_400_url ? shot.image_400_url : shot.image_url;
    return {uri};
  },
  authorAvatar: function(player: Object): {uri: ?string} {
    var uri;
    if (player) {
      uri = player.avatar_url;
      return {uri};
    } else {
      uri = require('image!AuthorAvatar');
      return uri;
    }
  }
}
