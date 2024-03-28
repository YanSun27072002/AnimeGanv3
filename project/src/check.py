
# import onnx

# model_path = './src/Shinkai_53.onnx'

# try:
#     onnx_model = onnx.load(model_path)
#     onnx.checker.check_model(onnx_model)
#     print('The ONNX model is valid.')
# except onnx.onnx_cpp2py_export.checker.ValidationError as e:
#     print(f'The ONNX model is invalid: {e}')
# except Exception as e:
#     print(f'An error occurred: {e}')
# // //////////////////////////////////////////////////
# import onnx

# model_path = r'C:\Users\ADMIN\project\src\Shinkai_53.onnx'
# model = onnx.load(model_path)
# ir_version = model.ir_version
# print(f"IR version: {ir_version}")

# # ////////////////////////////
# import onnx

# def check_onnx_version(model_path):
#     model = onnx.load(model_path)
#     onnx_version = model.ir_version
#     print(f"ONNX Version of the Model: {onnx_version}")

# if __name__ == "__main__":
#     model_path =r'C:\Users\ADMIN\project\src\Shinkai_53.onnx'
#     check_onnx_version(model_path)


import onnx
from onnx_tf.backend import prepare
import tensorflow as tf

# Load mô hình ONNX
onnx_model = onnx.load(r'C:\Users\ADMIN\project\src\Shinkai_53.onnx')

# Chuyển đổi ONNX model sang TensorFlow graph
tf_rep = prepare(onnx_model)

# Lấy TensorFlow graph
tf_graph = tf_rep.graph
tf.saved_model.save(tf_rep.tf_module, r'C:\Users\ADMIN\project\src\Shinkai_53_1.onnx')