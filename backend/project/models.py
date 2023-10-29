from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from . import db

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    subtasks = db.relationship('SubTask', backref='task', lazy=True, cascade="all,delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
            'completed': self.completed
        }


class SubTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    subsubtasks = db.relationship('SubSubTask', backref='subtask', lazy=True, cascade="all,delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'task_id': self.task_id,
            'completed': self.completed
        }


class SubSubTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    subtask_id = db.Column(db.Integer, db.ForeignKey('sub_task.id'), nullable=False)
    completed = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'subtask_id': self.subtask_id,
            'completed': self.completed
        }
