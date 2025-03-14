import service from "./axios";

// 查询Category列表
interface CategoryListParams {
  currentPage?: number;
  pageSize?: number;
  name?: string;
}
export const getCategoryList = (data: CategoryListParams) => {
  return service.get("/admin/categories", { params: data });
};

// 获取Category详情
export const getCategoryDetail = (id: number) => {
  return service.get(`/admin/categories/${id}`);
};

// 更新Category
interface UpdateCategoryParams {
  name?: string;
  rank?: number;
}
export const updateCategory = (data: UpdateCategoryParams,id: number) => {
  return service.put(`/admin/categories/${id}`, data);
};

// 删除Category
export const deleteCategory = (id: number) => {
  return service.delete(`/admin/categories/${id}`);
};

// 新增Category
export const addCategory = (data: UpdateCategoryParams) => {
  return service.post("/admin/categories", data);
}