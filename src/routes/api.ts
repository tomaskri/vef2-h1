import express, { Request, Response } from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  patchCategory,
} from './categories.js';
import {
  createCourse,
  deleteCourse,
  getCourse,
  listCourses,
  updateCourse,
} from './courses.js';
import {
  createDepartment,
  deleteDepartment,
  getDepartment,
  listDepartments,
  updateDepartment,
} from './departments.js';
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  patchItem,
} from './items.js';
import {
  createQuestion,
  deleteQuestion,
  getQuestion,
  getQuestions,
  patchQuestion,
  voteItem,
} from './questions.js';
import {
  deleteUser,
  getAdminDetails,
  getUser,
  getUsers,
  login,
  patchUser,
  signup,
} from './users.js';

export const router = express.Router();

export async function index(req: Request, res: Response) {
  // TODO: Fylla út með PATCH

  return res.json([
    {
      href: '/login',
      methods: ['POST'],
    },
    {
      href: '/signup',
      methods: ['POST'],
    },
    {
      href: '/admin',
      methods: ['GET'],
    },
    {
      href: '/users',
      methods: ['GET', 'POST'],
    },
    {
      href: '/users/:userId',
      methods: ['GET', 'DELETE'],
    },
    {
      href: '/items',
      methods: ['GET', 'POST'],
    },
    {
      href: '/items/:itemId',
      methods: ['GET', 'DELETE'],
    },
    {
      href: '/questions',
      methods: ['GET', 'POST'],
    },
    {
      href: '/questions/:questionId',
      methods: ['GET', 'DELETE'],
    },
    {
      href: '/questions/:questionId/:itemId',
      methods: ['POST'],
    },
    {
      href: '/categories',
      methods: ['GET', 'POST'],
    },
    {
      href: '/categories/:categoryId',
      methods: ['GET', 'DELETE'],
    },
  ]);
}

router.get('/', index);

// Users
router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/login', login);
router.post('/signup', signup);
router.get('/admin', getAdminDetails); // Hvað á getAdminDetails að gera?
router.delete('/users/:userId', deleteUser);
router.patch('/users/:userId', patchUser);

// Items
router.get('/items', getItems);
router.get('/items/:itemId', getItem);
router.post('/items', createItem);
router.delete('/items/:itemId', deleteItem);
router.patch('/items/:itemId', patchItem);

// Questions
router.get('/questions', getQuestions);
router.get('/questions/:questionId', getQuestion);
router.post('/questions/:questionId/:itemId', voteItem);
router.post('/questions', createQuestion);
router.delete('/questions/:questionId', deleteQuestion);
router.patch('/questions/:questionId', patchQuestion);

// Categories
router.get('/categories', getCategories);
router.get('/categories/:categoryId', getCategory);
router.post('/categories', createCategory);
router.delete('/categories/:categoryId', deleteCategory);
router.patch('/categories/:categoryId', patchCategory);

// Departments
router.get('/departments', listDepartments);
router.post('/departments', createDepartment);
router.get('/departments/:slug', getDepartment);
router.patch('/departments/:slug', updateDepartment);
router.delete('/departments/:slug', deleteDepartment);

// Courses
router.get('/departments/:slug/courses', listCourses);
router.post('/departments/:slug/courses', createCourse);
router.get('/departments/:slug/courses/:courseId', getCourse);
router.patch('/departments/:slug/courses/:courseId', updateCourse);
router.delete('/departments/:slug/courses/:courseId', deleteCourse);
