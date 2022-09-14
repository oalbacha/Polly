# Sabbar Full Stack Developer Test

## The Stack

- nextjs
- trpc
- prisma
- tailwindcss &
- planetscaled MySQL

## To ren the project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
# or
yarn dev
```

## Home Page

![image](https://user-images.githubusercontent.com/17005317/190023372-8302295c-44d6-4b83-b57a-ff9490104362.png)

## Infinite scrolling public published polls

<img width="235" alt="image" src="https://user-images.githubusercontent.com/17005317/190024267-65fc45d0-30ef-42de-93d4-390878382ab8.png">

## My polls

As a user, I have a tab for to viiew my own poll I have created

<img width="304" alt="image" src="https://user-images.githubusercontent.com/17005317/190024393-3d0db9cf-dd3d-47f9-be07-83bba4f1d027.png">

## Poll creation

- As a user I can set an expiry date for when the poll shall end. Votes are not allowed if poll has ended
- As a user I can add a minimum of 2 options with a maximum of 5
- As a user, I can verify who has voted on my poll through a voter token and when they voted

## The poll content page

- As a user, I can tell which poll is or if poll has expired

<img width="274" alt="image" src="https://user-images.githubusercontent.com/17005317/190025426-08bea90e-e350-4e0d-a920-bb4cf9ce5b89.png">
- As a user, I can not vote if I am the owner, if I've voted before or the poll has expired
- As a user, if allowed, I can view results of the poll. That's if it has ended, you own it or you have submitted a vote

<img width="633" alt="image" src="https://user-images.githubusercontent.com/17005317/190025515-96e836e7-d89f-409b-bd9e-efb56f3b95e8.png">

## Things I Learned

I had a lot of fun building out the features of this project. I hit some roadblocks and the project is in way ready for production. It probably needs a lot of testing of edge cases and fixing some bugs that are still present. I'd like to add proper state management to the app as there's quite a bit of state especially on the poll content page. I'd probably revisit all the types and make sure the app is typed properly. I would spend some time testing the main parts of the app.
