class UsersController {
  constructor(User) {
    this.User = User;
  }

  get(req, res) {
    return this.User.find({})
      .then(users => res.send(users))
      .catch(err => res.status(400).send(err.message));
  }

  getById(req, res) {
    const { params: { id } } = req;
    return this.User.find({ _id: id })
      .then(user => res.send(user))
      .catch(err => res.status(400).send(err.message));
  }

  create(req, res) {
    const user = new this.User(req.body);
    return user.save()
      .then(() => res.status(201).send(user))
      .catch(err => res.status(422).send(err.message));
  }

  update(req, res) {
    const { body } = req;
    return this.User.findById(req.params.id)
      .then((user) => {
        const newUser = new this.User(user);
        newUser.name = body.name;
        newUser.email = body.email;
        newUser.role = body.role;
        if (body.password) {
          newUser.password = body.password;
        }
        return newUser.save();
      })
      .then(() => res.sendStatus(200))
      .catch(err => res.status(422).send(err.message));
  }

  remove(req, res) {
    return this.User.remove({ _id: req.params.id })
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err.message));
  }
}
export default UsersController;
