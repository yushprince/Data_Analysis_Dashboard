const Data = require('../models/Data');

exports.getData = async (req, res) => {
    try {
        // Extract filters from the request query parameters
        const {
            endYear,
            topics,
            sector,
            region,
            pest,
            source,
            swot,
            country,
            city,
          } = req.query;
      
          // Construct the filter object based on the provided parameters
          const filters = {};
      
          if (endYear) filters.end_year = endYear;
      
          if (topics) filters.topic = { $in: topics.split(',') };
      
          if (sector) filters.sector = sector;
      
          if (region) filters.region = region;
      
          if (pest) filters.pestle = pest;
      
          if (source) filters.source = source;
      
          if (swot) filters.swot = swot;
      
          if (country) filters.country = country;
      
          if (city) filters.city = city;
        

        const data = await Data.find({}).limit(30);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addData = async (req, res) => {
    try {
        const newData = new Data(req.body);
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};