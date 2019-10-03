# Modules

(This documentation file is still **in development**)

At the core of Ebony Framework are modules. Modules are independent, portable collections of actions, rules and middlewares that define the way your bot responds to queries.

## Actions

### Action

```typescript
async function customAction(user: User, payload?: any)
```

Params:

* user: `U extends User` (For example `MessengerUser`)
* payload: `any`

Returns: `Promise<any>`

### Actions collection

Your module object should have a property `actions`. In this property, you store an object that includes all the actions you defined in your module.

## Rules

### Postback rules

Postback rules are triggered when a user hits a button or sends any non-text query in your bot.

### Text rules

Text rules are triggered when a user sends any text sequence in at your bot.

### Referral rules

Referrals are a way to trigger your bot depending on non-direct user input, such as when the user visits a certain link. When you use the messenger platform, the referrals correspond to ref links. (m.me links)
