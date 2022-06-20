const Career = require("../models/Career");
const Yup = require("yup");

class CareerController {
  async index(req, res) {
    const { page } = req.query;

    const careers = await Career.find()
      .sort("-createdAt")
      .limit(5)
      .skip((page - 1) * 5);

    return res.status(200).json(careers);
  }

  async create(req, res) {
    const {
      title,
      period,
      location,
      salary,
      responsibilities,
      requirements,
      niceToHave,
    } = req.body;

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      period: Yup.string().required(),
      location: Yup.string().required(),
      salary: Yup.string().required(),
      responsibilities: Yup.array().required(),
      requirements: Yup.array().required(),
    });

    if (!(await schema.isValid)) {
      return res.status(400).json({
        error: "Validation fails!",
      });
    }

    const career = await Career.create({
      title,
      period,
      location,
      salary,
      responsibilities,
      requirements,
      niceToHave,
    });

    return res.status(200).json(career);
  }

  async show(req, res) {
    const { title } = req.params;

    const career = await Career.findOne({ title });

    if (!career) {
      return res.status(404).json({
        error: "Career not found!",
      });
    }

    return res.status(200).json(career);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      title,
      period,
      location,
      salary,
      responsibilities,
      requirements,
      niceToHave,
    } = req.body;

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      period: Yup.string().required(),
      location: Yup.string().required(),
      salary: Yup.string().required(),
      responsibilities: Yup.string().required(),
      requirements: Yup.string().required(),
    });

    if (!(await schema.isValid)) {
      return res.status(400).json({
        error: "Validation fails!",
      });
    }

    const data = {
      title,
      period,
      location,
      salary,
      responsibilities,
      requirements,
      niceToHave,
    };

    const career = await Career.findByIdAndUpdate(id, data, {
      new: true,
    });

    return res.status(200).json(career);
  }
  async delete(req, res) {
    const { id } = req.params;

    const career = await Career.findByIdAndDelete(id);

    return res.status(200).json(career);
  }
}

module.exports = new CareerController();
