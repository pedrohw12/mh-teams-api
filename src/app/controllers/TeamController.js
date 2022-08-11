const Team = require("../models/Team");
const AWS = require("../../libs/aws");
const Yup = require("yup");

class TeamController {
  async index(req, res) {
    const { page } = req.query;

    const members = await Team.find()
      .sort("-createdAt")
      .limit(5)
      .skip((page - 1) * 5);

    return res.status(200).json(members);
  }

  async create(req, res) {
    const { name, role, socialMediaUrl, description } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      role: Yup.string().required(),
      socialMediaUrl: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid)) {
      return res.status(400).json({
        error: "Validation fails!",
      });
    }

    const member = await Team.create({
      name,
      role,
      socialMediaUrl,
      description,
    });

    return res.status(200).json(member);
  }

  async show(req, res) {
    const { name } = req.params;

    const member = await Team.findOne({ name });

    if (!member) {
      return res.status(404).json({
        error: "Member not found!",
      });
    }

    return res.status(200).json(member);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, role, socialMediaUrl, description } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      role: Yup.string().required(),
      socialMediaUrl: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid)) {
      return res.status(400).json({
        error: "Validation fails!",
      });
    }

    const data = {
      name,
      role,
      socialMediaUrl,
      description,
    };

    const member = await Team.findByIdAndUpdate(id, data, {
      new: true,
    });

    return res.status(200).json(member);
  }

  onComplete(err, data) {
    console.log(`## [AWS] onComplete ##`);
    if (err) {
      console.error(`> Error: ${JSON.stringify(err, null, 2)}`);
    } else {
      console.log(`> Success: ${JSON.stringify(data, null, 2)}`);
    }
  }

  async uploadFile(req, res) {
    console.log(req.file)

    if (!req.file) {
      return res.status(404).json({ error: "No file was uploaded" });
    }
    const file = req.file;

    const S3 = new AWS.S3();
    S3.upload(
      {
        bucketName: "website-general-assets",
        originalFileName: `${req.file.path}`,
        targetFileName: "images/team/dani.jpg",
      },
      // this.onComplete()
    );

    return res.status(200);
  }

  async delete(req, res) {
    const { id } = req.params;

    const member = await Team.findByIdAndDelete(id);

    return res.status(200).json(member);
  }
}

module.exports = new TeamController();
