/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { FilterQuery, Model } from 'mongoose';

import paginate, {
  QueryOption, QueryResult,
} from '../../../../src/models/plugins/paginate.plugin';
import setupTestDB from '../../../utils/setupTestDB';

interface ProjectModel extends Model<ProjectInterface, unknown, unknown> {
  paginate: (
    filter: FilterQuery<unknown>,
    options: QueryOption
  ) => Promise<QueryResult<ProjectInterface>>;
}

interface TaskModel extends Model<TaskInterface, unknown, unknown> {
  paginate: (
    filter: FilterQuery<unknown>,
    options: QueryOption
  ) => Promise<QueryResult<TaskInterface>>;
}

interface ProjectInterface {
  name: string;
  tasks: TaskInterface[];
}

interface TaskInterface {
  name: string;
  project: mongoose.Types.ObjectId;
}

const projectSchema = new mongoose.Schema<ProjectInterface, ProjectModel, unknown>({
  name: {
    type: String,
    required: true,
  },
});

projectSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'project',
});

projectSchema.plugin(paginate);
const Project = mongoose.model<ProjectInterface, ProjectModel>('Project', projectSchema);

const taskSchema = new mongoose.Schema<TaskInterface, TaskModel, unknown>({
  name: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
});

taskSchema.plugin(paginate as any);
const Task = mongoose.model<TaskInterface, TaskModel>('Task', taskSchema);

setupTestDB();

describe('paginate plugin', () => {
  describe('populate option', () => {
    test('should populate the specified data fields', async () => {
      const project = await Project.create({ name: 'Project One' });
      const task = await Task.create({
        name: 'Task One',
        project: project._id,
      });

      const taskPages = await Task.paginate(
        { _id: task._id },
        { populate: 'project' }
      );

      expect(taskPages.results[0].project).toHaveProperty('_id', project._id);
    });

    test('should populate nested fields', async () => {
      const project = await Project.create({ name: 'Project One' });
      const task = await Task.create({
        name: 'Task One',
        project: project._id,
      });

      const projectPages = await Project.paginate(
        { _id: project._id },
        { populate: 'tasks.project' }
      );
      const { tasks } = projectPages.results[0];

      expect(tasks).toHaveLength(1);
      expect(tasks[0]).toHaveProperty('_id', task._id);
      expect(tasks[0].project).toHaveProperty('_id', project._id);
    });
  });
});
