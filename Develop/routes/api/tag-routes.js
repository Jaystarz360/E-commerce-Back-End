const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
// find all tags
// be sure to include its associated Product data
 try {
  const tagData = await Tag.findAll({
    include: [{model:Product,}],
});

  return res.status(200).json(tagData);
} catch (err) {
  return res.status(500).json(err);
}

});


router.get('/:id', async (req, res) => {
// find a single tag by its `id`
// be sure to include its associated Product data
try{
  const tagData = await Tag.findByPk(req.params.id, {
    include:[{model:Product}],
});

if (!tagData){
  return res.status(404).json({message:'No tag with that ID...'});
}

  return res.status(200).json(tagData);
} catch (err) {
  return res.status(500).json(err);
}

});


router.post('/', async (req, res) => {
// create a new tag
try {
  const newTag = await Tag.create(req.body)
  return res.status(200).json(newTag);

} catch (err) {
  return res.status(500).json(err)
}

});



router.put('/:id', async (req, res) => {
// update a tag's name by its `id` value
try{
  const tagUp = await Tag.update(req.body, 
    {
    where: {
      id: req.params.id,
}

});

if (tagUp[0]) {
    return res.status(404).json({message:'No tag with that ID...'});
  }
    return res.json(tagUp);
  } catch (err) {
    return res.status(500).json(err)
  }

});

router.delete('/:id', async (req, res) => {
 // delete on tag by its `id` value
 try {
  const tagOut = await Tag.destroy({
    where:{
      id:req.params.id,
    }

  });

  if (!tagOut) {
    return res.status(404).json({message:'No tag with that ID...'});
  }
  return res.status(200).json(tagOut);
} catch (err) {
  return res.status(500).json(err);
}

});

module.exports = router;
