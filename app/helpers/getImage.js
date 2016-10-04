//@flow

export function shotImage (shot: Object): {uri: ?string} {
    var uri = shot.images.normal ? shot.images.normal : shot.images.teaser;
    return {uri};
}

export function authorAvatar(player: Object): {uri: ?string} {
    var uri;

    if (player) {
        uri = player.avatar_url;
        return {uri};
    } else {
        uri = require('../../img/AuthorAvatar.png');
        return uri;
    }
 }
