const express=require('express')
const route=express.Router()

const listenerregister=require('./listenerlogin/listenercontroller')
const creatorregister=require('./creatorlogin/creatorcontroller')
const creatorupload=require('./creatorlogin/creatorpodcastcontroller')
const listenerReview=require('./Review/reviewController')
const addamusic=require('./Admin/adminmusiccontroller')
const wishlist=require('./listenerlogin/wishlistcontroller')
const subscriptions=require('./subscription/subscriptioncontoller')

route.post('/adminaddsong',addamusic.multipleUpload,addamusic.adminaddmusic)
route.get('/viewallmusic',addamusic.viewAllMusic)
route.delete('/deletesong/:id',addamusic.deleteasong)


route.post('/listenerreg',listenerregister.upload,listenerregister.addlistenerreg)
route.post('/listenerlogin',listenerregister.listenerlogin)
route.get('/viewlistenerdetail/:id',listenerregister.viewlistenerdetail)
route.post('/listenerforgotpass',listenerregister.listenerforgetpassword)
// route.post('/passwordforget',listenerregister.forgetpasswordonly)
route.get('/viewlisterner',listenerregister.viewlistener)
route.get('/viewListenerById/:id',listenerregister.viewListenerById)
route.post('/editlistener/:id',listenerregister.upload,listenerregister.listeneredit)
route.delete('/listenerdelete/:id',listenerregister.deletelistenerById)

route.post('/creatorregister',creatorregister.upload,creatorregister.addcreatorreg)
route.post('/creatorlogin',creatorregister.creatorlogin)
route.post('/creatorforget',creatorregister.creatorforgetpassword)
route.get('/viewcreator',creatorregister.viewcreator)
route.get('/viewCreatorById/:id',creatorregister.viewCreatorById)
route.post('/editcreator/:id',creatorregister.upload,creatorregister.editcreator)
route.delete('/deletecreator/:id',creatorregister.deleteCreatorById)


route.post('/uploadsong',creatorupload.multipleUpload,creatorupload.addcreatorupload)
route.get('/viewcreatorsong',creatorupload.viewcreatorsong)
route.get('/VUSongs',creatorupload.viewuploadsongById)
route.get('/viewsongs/:id',creatorupload.getAllPodcastByCreator)


route.post('/addreview',listenerReview.listeneraddReview)
route.get('/getreviewodpodcast',listenerReview.getreviewodpodcast)
route.get('/getReviewaById',listenerReview.getCreatorReview)

route.post('/addToWishlist',wishlist.addToWishlist)
route.get('/whislistview/:id',wishlist.getWishlist)


route.post('/addsubscriber',subscriptions.addsubscriber)
route.get('/viewsubscriberbylistener/:id',subscriptions.getsubscriberByListenerId)
route.get('/viewallsubscribers',subscriptions.allsubcribers)
route.get('/viewbycreatorid/:id',subscriptions.viewSubscriptionByCreatorId)

route.get('/getsubscriberbycreatorid/:id',creatorregister.getsubscriberbycreatorid)
module.exports=route