export type Product = {
  unique_index: number;
  _id?: string;
  source: string;
  name: string;
  medicine_link: string;
  images: string[];
  retail_price: number;
  discounted_price: number;
  description: string;
  prescription_required: boolean;
  availability: boolean;
  manufacturer: string;
  salts?: string;
  composition?: string;
  quantity: number;
  form?: string;
};

//Reference:
// {
//     unique_index: 4000,
//     id: "torus-0",
//     source: "torus",
//     name: "#NAME?",
//     medicine_link:
//       "https://torusuat.emedadmin.com/uat/product/holistic-nutraceuticals-food-test/name-1732",
//     prescription_required: false,
//     availability: false,
//     retail_price: 374.0,
//     discounted_price: 305.0,
//     manufacturer: "MACLEODS PHARMACEUTICALS PVT LTD",
//     salts: "",
//     composition: "",
//     quantity: "",
//     form: "powder",
//     images: [],
//     description: "",
//     cluster_id: 1,
//     manufacturer_id: 0,
//     cluster_name: "#NAME?",
//     dummy_cluster_name: "#NAME?",
//     cluster_images: [],
//     cluster_quantity: "",
//     cluster_description: "",
//     total_pharmacies: 10,
//   },
