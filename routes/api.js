const express=require('express');
const router=express.Router();
const {getFakeApi_AndSaveInDb,productsEjs,addProducttoCarts,cart}=require('../controllers/api')





router.get('/api/FakeApi',

getFakeApi_AndSaveInDb
);
router.get('/api/Cart',

cart
);

router.get('/api/getProducts',

productsEjs
);

router.post('/api/customer/addProductsToCart/:id',

addProducttoCarts
);



module.exports=router;
