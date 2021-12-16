const Ziggy = {
  "url": "http:\/\/localhost",
  "port": null,
  "defaults": {},
  "routes": {
    "login": {
      "uri": "login",
      "methods": ["GET", "HEAD"]
    },
    "logout": {
      "uri": "logout",
      "methods": ["POST"]
    },
    "password.request": {
      "uri": "forgot-password",
      "methods": ["GET", "HEAD"]
    },
    "password.reset": {
      "uri": "reset-password\/{token}",
      "methods": ["GET", "HEAD"]
    },
    "password.email": {
      "uri": "forgot-password",
      "methods": ["POST"]
    },
    "password.update": {
      "uri": "reset-password",
      "methods": ["POST"]
    },
    "register": {
      "uri": "register",
      "methods": ["GET", "HEAD"]
    },
    "verification.notice": {
      "uri": "verify-email",
      "methods": ["GET", "HEAD"]
    },
    "verification.verify": {
      "uri": "verify-email\/{id}\/{hash}",
      "methods": ["GET", "HEAD"]
    },
    "verification.send": {
      "uri": "email\/verification-notification",
      "methods": ["POST"]
    },
    "user-profile-information.update": {
      "uri": "user\/profile-information",
      "methods": ["PUT"]
    },
    "user-password.update": {
      "uri": "user\/password",
      "methods": ["PUT"]
    },
    "password.confirm": {
      "uri": "confirm-password",
      "methods": ["GET", "HEAD"]
    },
    "password.confirmation": {
      "uri": "user\/confirmed-password-status",
      "methods": ["GET", "HEAD"]
    },
    "two-factor.login": {
      "uri": "two-factor-challenge",
      "methods": ["GET", "HEAD"]
    },
    "two-factor.enable": {
      "uri": "user\/two-factor-authentication",
      "methods": ["POST"]
    },
    "two-factor.disable": {
      "uri": "user\/two-factor-authentication",
      "methods": ["DELETE"]
    },
    "two-factor.qr-code": {
      "uri": "user\/two-factor-qr-code",
      "methods": ["GET", "HEAD"]
    },
    "two-factor.recovery-codes": {
      "uri": "user\/two-factor-recovery-codes",
      "methods": ["GET", "HEAD"]
    },
    "terms.show": {
      "uri": "terms-of-service",
      "methods": ["GET", "HEAD"]
    },
    "policy.show": {
      "uri": "privacy-policy",
      "methods": ["GET", "HEAD"]
    },
    "profile.show": {
      "uri": "user\/profile",
      "methods": ["GET", "HEAD"]
    },
    "other-browser-sessions.destroy": {
      "uri": "user\/other-browser-sessions",
      "methods": ["DELETE"]
    },
    "current-user-photo.destroy": {
      "uri": "user\/profile-photo",
      "methods": ["DELETE"]
    },
    "current-user.destroy": {
      "uri": "user",
      "methods": ["DELETE"]
    },
    "teams.create": {
      "uri": "teams\/create",
      "methods": ["GET", "HEAD"]
    },
    "teams.store": {
      "uri": "teams",
      "methods": ["POST"]
    },
    "teams.show": {
      "uri": "teams\/{team}",
      "methods": ["GET", "HEAD"]
    },
    "teams.update": {
      "uri": "teams\/{team}",
      "methods": ["PUT"]
    },
    "teams.destroy": {
      "uri": "teams\/{team}",
      "methods": ["DELETE"]
    },
    "current-team.update": {
      "uri": "current-team",
      "methods": ["PUT"]
    },
    "team-members.store": {
      "uri": "teams\/{team}\/members",
      "methods": ["POST"]
    },
    "team-members.update": {
      "uri": "teams\/{team}\/members\/{user}",
      "methods": ["PUT"]
    },
    "team-members.destroy": {
      "uri": "teams\/{team}\/members\/{user}",
      "methods": ["DELETE"]
    },
    "team-invitations.accept": {
      "uri": "team-invitations\/{invitation}",
      "methods": ["GET", "HEAD"],
      "bindings": { "invitation": "id" }
    },
    "team-invitations.destroy": {
      "uri": "team-invitations\/{invitation}",
      "methods": ["DELETE"],
      "bindings": { "invitation": "id" }
    },
    "telescope": {
      "uri": "telescope\/{view?}",
      "methods": ["GET", "HEAD"]
    },
    "encounter": {
      "uri": "e",
      "methods": ["GET", "HEAD"]
    },
    "encounter.owner": {
      "uri": "e\/{slug}",
      "methods": ["GET", "HEAD"]
    },
    "encounter.active": {
      "uri": "e\/active",
      "methods": ["GET", "HEAD"]
    },
    "encounter.lookup": {
      "uri": "e\/lookup",
      "methods": ["POST"]
    },
    "encounter.add": {
      "uri": "encounter\/{encounter}\/add\/{type}",
      "methods": ["POST"],
      "bindings": { "encounter": "id" }
    },
    "encounter.remove": {
      "uri": "encounter\/{encounter}\/remove",
      "methods": ["POST"],
      "bindings": { "encounter": "id" }
    },
    "monster": {
      "uri": "monster\/{monster}",
      "methods": ["GET", "HEAD"],
      "bindings": { "monster": "id" }
    },
    "spell": {
      "uri": "spell\/{spell}",
      "methods": ["GET", "HEAD"],
      "bindings": { "spell": "id" }
    },
    "welcome": {
      "uri": "\/",
      "methods": ["GET", "HEAD"]
    },
    "encounter.player": {
      "uri": "p\/{slug}",
      "methods": ["GET", "HEAD"]
    },
    "encounter.save": {
      "uri": "encounter\/{encounter}\/save",
      "methods": ["POST"],
      "bindings": { "encounter": "id" }
    },
    "encounter.clear": {
      "uri": "encounter\/{encounter}\/clear",
      "methods": ["POST"],
      "bindings": { "encounter": "id" }
    },
    "encounter.update": {
      "uri": "encounter\/{encounter}\/update",
      "methods": ["POST"],
      "bindings": { "encounter": "id" }
    },
    "encounter.destroy": {
      "uri": "encounter\/{encounter}\/destroy",
      "methods": ["POST"],
      "bindings": { "encounter": "id" }
    },
    "monster.duplicate": {
      "uri": "monster\/{monster}\/duplicate",
      "methods": ["POST"],
      "bindings": { "monster": "id" }
    },
    "character": {
      "uri": "character\/{character}",
      "methods": ["GET", "HEAD"],
      "bindings": { "character": "id" }
    },
    "character.duplicate": {
      "uri": "character\/{character}\/duplicate",
      "methods": ["POST"],
      "bindings": { "character": "id" }
    },
    "characters.claim": {
      "uri": "characters\/{character}\/claim",
      "methods": ["POST"],
      "bindings": { "character": "id" }
    },
    "characters.store": {
      "uri": "characters",
      "methods": ["POST"]
    },
    "characters.update": {
      "uri": "characters\/{character}",
      "methods": ["PUT"],
      "bindings": { "character": "id" }
    },
    "monster.store": {
      "uri": "monsters",
      "methods": ["POST"]
    },
    "monster.update": {
      "uri": "monsters\/{monster}",
      "methods": ["PUT"],
      "bindings": { "monster": "id" }
    },
    "dashboard": {
      "uri": "dashboard",
      "methods": ["GET", "HEAD"]
    },
    "encounters": {
      "uri": "encounters",
      "methods": ["GET", "HEAD"]
    },
    "characters": {
      "uri": "characters",
      "methods": ["GET", "HEAD"]
    },
    "characters.destroy": {
      "uri": "characters\/{character}",
      "methods": ["DELETE"],
      "bindings": { "character": "id" }
    },
    "monsters.destroy": {
      "uri": "monsters\/{monster}",
      "methods": ["DELETE"],
      "bindings": { "monster": "id" }
    },
    "monsters": {
      "uri": "monsters",
      "methods": ["GET", "HEAD"]
    },
    "monsters.import": {
      "uri": "monsters\/import",
      "methods": ["POST"]
    }
  }
};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };
