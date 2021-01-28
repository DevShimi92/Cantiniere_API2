import { Application } from "express";
import { DefaultController } from "../controllers/default_controller";
import { UserController } from "../controllers/user_controller";
import { TypeArticleController } from "../controllers/type_article_controller";
import { ArticleController } from "../controllers/article_controller";
import { MenuInfoController } from "../controllers/menu_info_controller";
import { MenuContentController } from "../controllers/menu_content_controller";
import { OrderInfoController } from "../controllers/order_info_controller";

export class Routes {
  
  private DefaultController: DefaultController = new DefaultController();
  private UserController: UserController = new UserController();
  private TypeArticleController: TypeArticleController = new TypeArticleController();
  private ArticleController: ArticleController = new ArticleController();
  private MenuInfoController: MenuInfoController = new MenuInfoController();
  private MenuContentController: MenuContentController = new MenuContentController();
  private OrderInfoController: OrderInfoController = new OrderInfoController();

  public routes(app: Application): void {

    app.route("/").get(this.DefaultController.index);

    app.route("/user").post(this.UserController.createUser);
    app.route("/user").get(this.UserController.getAllUser);
    app.route("/user").put(this.UserController.updateUser);
    app.route("/user").delete(this.UserController.deleteUser);

    app.route("/type_article").post(this.TypeArticleController.createTypeArticle);
    app.route("/type_article").get(this.TypeArticleController.getAllTypeArticle);
    app.route("/type_article").put(this.TypeArticleController.updateTypeArticle);
    app.route("/type_article").delete(this.TypeArticleController.deleteTypeArticle);

    app.route("/article").post(this.ArticleController.createArticle);
    app.route("/article").get(this.ArticleController.getAllArticle);
    app.route("/article").put(this.ArticleController.updateArticle);
    app.route("/article").delete(this.ArticleController.deleteArticle);

    app.route("/menu").post(this.MenuInfoController.createMenu);
    app.route("/menu").get(this.MenuInfoController.getAllMenu);
    app.route("/menu").put(this.MenuInfoController.updateMenu);
    app.route("/menu").delete(this.MenuInfoController.deleteMenu);

    app.route("/menu/:id").get(this.MenuContentController.getMenu);
    app.route("/menu/content").post(this.MenuContentController.addToMenu);
    app.route("/menu/content").delete(this.MenuContentController.deleteToMenu);

    app.route("/order").post(this.OrderInfoController.createOrder);
    app.route("/order/:id").get(this.OrderInfoController.getOrder);
    app.route("/order/:id").delete(this.OrderInfoController.deleteOrder);
  }
}