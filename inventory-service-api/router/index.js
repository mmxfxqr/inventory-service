const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");
const departmentController = require("../controllers/department-controller");
const workplaceController = require("../controllers/workplace-controller");
const employeeController = require("../controllers/employee-controller");
const computerController = require("../controllers/computer-controller");
const componentController = require("../controllers/component-controller");
const peripheralController = require("../controllers/peripheral-controller");
const router = new Router();
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
// User routes
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
// Department routes
router.post("/departments",  departmentController.create);
router.get("/departments",  departmentController.getAll);
router.get("/departments/:id", authMiddleware, departmentController.getOne);
router.put("/departments/:id", authMiddleware, departmentController.update);
router.delete("/departments/:id", authMiddleware, departmentController.delete);

// Workplace routes
router.post("/workplaces", authMiddleware, workplaceController.create);
router.get("/workplaces", authMiddleware, workplaceController.getAll);
router.get("/workplaces/:id", authMiddleware, workplaceController.getOne);
router.put("/workplaces/:id", authMiddleware, workplaceController.update);
router.delete("/workplaces/:id", authMiddleware, workplaceController.delete);

// Employee routes
router.post("/employees", authMiddleware, employeeController.create);
router.get("/employees", authMiddleware, employeeController.getAll);
router.get("/employees/:id", authMiddleware, employeeController.getOne);
router.put("/employees/:id", authMiddleware, employeeController.update);
router.delete("/employees/:id", authMiddleware, employeeController.delete);

// Computer routes
router.post("/computers", authMiddleware, computerController.create);
router.get("/computers", authMiddleware, computerController.getAll);
router.get("/computers/:id", authMiddleware, computerController.getOne);
router.put("/computers/:id", authMiddleware, computerController.update);
router.delete("/computers/:id", authMiddleware, computerController.delete);

// Component routes
router.post("/components", authMiddleware, componentController.create);
router.get("/components", authMiddleware, componentController.getAll);
router.get("/components/:id", authMiddleware, componentController.getOne);
router.put("/components/:id", authMiddleware, componentController.update);
router.delete("/components/:id", authMiddleware, componentController.delete);

// Peripheral routes
router.post("/peripherals", authMiddleware, peripheralController.create);
router.get("/peripherals", authMiddleware, peripheralController.getAll);
router.get("/peripherals/:id", authMiddleware, peripheralController.getOne);
router.put("/peripherals/:id", authMiddleware, peripheralController.update);
router.delete("/peripherals/:id", authMiddleware, peripheralController.delete);

module.exports = router;
