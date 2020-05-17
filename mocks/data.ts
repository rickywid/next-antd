export interface IProject {
  id: number,
  name: string,
  descriptionShort: string,
  description: string,
  commentCount: number,
  tags: string[],
  upvoteCount: number,
  url: string,
  thumbnail: string
}

export interface IProjects {
  [name:string]: IProject[]
}

const data: IProjects = {
  projects:  [
    {
      id: 1,
      name: 'Spotify',
      descriptionShort: 'Music streaming service.',
      description: 'Is an international media services provider. It is legally domiciled in Luxembourg and is headquartered in Stockholm, Sweden. Founded in 2006, the company\'s primary business is providing an audio streaming platform, the "Spotify" platform, that provides DRM-restricted music, videos and podcasts from record labels and media companies. As a freemium service, basic features are free with advertisements or automatic music videos, while additional features, such as offline listening and commercial-free listening, are offered via paid subscriptions.',
      commentCount: 15,
      tags: ['sports', 'analytics'],
      upvoteCount: 50,
      url: 'https://spotify.com',
      thumbnail: 'https://cdn.jim-nielsen.com/ios/512/spotify-music-2015-07-30.png'
    },
    {
      id: 2,
      name: 'Facebook',
      descriptionShort: 'Social media network connecting others.',
      description: 'Facebook is an American online social media and social networking service based in Menlo Park, California and a flagship service of the namesake company Facebook, Inc. It was founded by Mark Zuckerberg, along with fellow Harvard College students and roommates Eduardo Saverin, Andrew McCollum, Dustin Moskovitz and Chris Hughes.',
      commentCount: 31,
      tags: ['social'],
      upvoteCount: 80,
      url: 'https://facebook.com',
      thumbnail: 'https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512'
    },
    {
      id: 3,
      name: 'Reddit',
      descriptionShort: 'News aggregation website.',
      description: 'Reddit is an American social news aggregation, web content rating, and discussion website. Registered members submit content to the site such as links, text posts, and images, which are then voted up or down by other members. Posts are organized by subject into user-created boards called "subreddits", which cover a variety of topics like news, science, movies, video games, music, books, fitness, food, and image-sharing.',
      commentCount: 131,
      tags: ['social'],
      upvoteCount: 24,
      url: 'https://reddit.com',
      thumbnail: 'https://cdn0.iconfinder.com/data/icons/social-media-2092/100/social-36-512.png'
    },
    {
      id: 4,
      name: 'Instagram',
      descriptionShort: 'A photo and video sharing social media website.',
      description: 'Instagram s an American photo and video-sharing social networking service owned by Facebook, Inc. It was created by Kevin Systrom and Mike Krieger, and launched in October 2010 on iOS. A version for Android devices was released in April 2012, followed by a feature-limited website interface in November 2012, a Fire OS app on June 15, 2014 and an app for Windows 10 tablets and computers in October 2016. The app allows users to upload media , which can be edited with filters and organized with tags and location information. Posts can be shared publicly or with pre-approved followers. Users can browse other users\' content by tags and locations, and view trending content. Users can like photos and follow other users to add their content to a feed.',
      commentCount: 53,
      tags: ['social'],
      upvoteCount: 94,
      url: 'https://instagram.com',
      thumbnail: 'https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png?w=300'
    },
    {
      id: 5,
      name: 'Twitter',
      descriptionShort: 'Social networking service allowing users to post and interactive with messages known as "tweets".',
      description: 'Twitter is an American microblogging and social networking service on which users post and interact with messages known as "tweets". Registered users can post, like, and retweet tweets, but unregistered users can only read them. Users access Twitter through its website interface, through Short Message Service (SMS) or its mobile-device application software ("app"). Twitter, Inc. is based in San Francisco, California, and has more than 25 offices around the world. Tweets were originally restricted to 140 characters, but was doubled to 280 for non-Asian languages in November 2017.',
      commentCount: 98,
      tags: ['social'],
      upvoteCount: 466,
      url: 'https://twitter.com',
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/basicolor-reading-writing/24/077_twitter-512.png'
    },
    {
      id: 6,
      name: 'TikTok',
      descriptionShort: 'Video-sharing social networking service.',
      description: 'TikTok is a video-sharing social networking service owned by ByteDance, a Chinese company founded in 2012 by Zhang Yiming. It is used to create short dance, lip-sync, comedy and talent videos. ByteDance first launched Douyin for the China market in September 2016. Later, TikTok was launched in 2017 for iOS and Android in markets outside of China. It became available in the United States after merging with musical.ly on 2 August 2018. TikTok and Douyin are similar to each other, however they run on separate servers to comply with Chinese censorship restrictions. The application allows users to create short music and lip-sync videos of 3 to 15 seconds and short looping videos of 3 to 60 seconds. The app is popular in Asia, the United States, and other parts of the world. TikTok and Douyin\'s servers are each based in the markets where the apps are available.',
      commentCount: 98,
      tags: ['social'],
      upvoteCount: 466,
      url: 'https://tiktok.com',
      thumbnail: 'https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Tiktok-512.png'
    },
    {
      id: 7,
      name: 'Youtube',
      descriptionShort: 'Video-sharing platform.',
      description: 'YouTube is an American online video-sharing platform headquartered in San Bruno, California. Three former PayPal employees—Chad Hurley, Steve Chen, and Jawed Karim—created the service in February 2005. Google bought the site in November 2006 for US$1.65 billion; YouTube now operates as one of Google\'s subsidiaries.',
      commentCount: 932,
      tags: ['social'],
      upvoteCount: 674,
      url: 'https://youtube.com',
      thumbnail: 'https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Youtube-512.png'
    },
    {
      id: 8,
      name: 'Snapchat',
      descriptionShort: 'Multimedia messaging app.',
      description: 'Snapchat is a multimedia messaging app developed by Snap Inc., originally Snapchat Inc. One of the principal features of Snapchat is that pictures and messages are usually only available for a short time before they become inaccessible to their recipients. The app has evolved from originally focusing on person-to-person photo sharing to presently featuring users\' "Stories" of 24 hours of chronological content, along with "Discover," letting brands show ad-supported short-form content. It also allows users to keep photos in the "my eyes only" which lets them keep their photos in a password-protected space.',
      commentCount: 932,
      tags: ['social'],
      upvoteCount: 674,
      url: 'https://snapchat.com',
      thumbnail: 'https://pbs.twimg.com/profile_images/1156097144664670208/aWnU5YMO_400x400.jpg'
    },
    {
      id: 9,
      name: 'DoorDash',
      descriptionShort: 'On-demand prepared food delivery service.',
      description: 'DoorDash Inc. is a San Francisco-based on-demand prepared food delivery service founded in 2013 by Stanford students Tony Xu, Stanley Tang, Andy Fang, Rob Davis and Evan Moore. Although Davis was cited to be one of the founders of the concept, after many debates he was forced to resign shortly after the company’s start. A Y Combinator–backed company, DoorDash is one of several technology companies that uses logistics services to offer food delivery from restaurants on-demand. DoorDash launched in Palo Alto and, as of May 2019, had expanded to more than 4,000 cities and offers a selection of 340,000 stores across the U.S. and Canada. The company is currently worth more than $13 billion and is the largest third-party delivery service in the USA, surpassing Grubhub in 2019.',
      commentCount: 245,
      tags: ['social', 'food'],
      upvoteCount: 141,
      url: 'https://doordash.com',
      thumbnail: 'https://pbs.twimg.com/profile_images/953514920435318785/7_O-NkAM_400x400.jpg'
    },
    {
      id: 10,
      name: 'Tesla Inc',
      descriptionShort: 'An electric vehicle and clean energy company.',
      description: 'Tesla is an American electric vehicle and clean energy company based in Palo Alto, California. The company specializes in electric vehicle manufacturing, battery energy storage from home to grid scale and, through its acquisition of SolarCity, solar panel and solar roof tile manufacturing.',
      commentCount: 245,
      tags: ['energy', 'environment'],
      upvoteCount: 141,
      url: 'https://tesla.com',
      thumbnail: 'https://www.logodesignlove.com/images/monograms/tesla-symbol.jpg'
    },
  ]
}



export default data;
