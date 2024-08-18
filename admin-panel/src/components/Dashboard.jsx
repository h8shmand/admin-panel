import { useProducts } from "./context/ProductsProvider";
import { useUsers } from "./context/UsersProvider";

export default function Dashboard() {
  const { products } = useProducts();
  const { users } = useUsers();
  return (
    <div className="dashboard-container h-full w-full flex overflow-y-auto">
      <div className="cards-list w-full flex flex-row flex-wrap h-fit justify-center">
        <DashboardCards title={"تعداد کاربران:"} count={users.length} />
        <DashboardCards title={"تعداد محصولات:"} count={products.length} />
        <DashboardCards title={"تعداد مقالات:"} count={3} />
        <DashboardCards title={"تعداد دسته بندی ها:"} count={3} />
      </div>
    </div>
  );
}

function DashboardCards({ title, count }) {
  return (
    <div className="dashboard-card w-[22%] min-w-[248px] h-[80px] mx-[1.5%] my-6 flex items-center justify-center bg-gray-200 rounded-lg">
      <div className="flex flex-row ">
        <h2 className="text-lg ml-2">{title}</h2>
        <h2 className="text-lg">{count}</h2>
      </div>
    </div>
  );
}
