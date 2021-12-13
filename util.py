import importlib.util
from importlib import import_module
import pathlib
import os


def call_all_getAnalysis_methods(id):
    current_directory = pathlib.Path('analyze_tools')
    current_pattern = "*.py"
    modules = []
    for current_file in current_directory.glob(current_pattern):
        path = str(current_file)
        path = path.replace('\\', '.')
        path = path.replace('.py', '')
        modules.append(path)
    module_result = []
    for value in modules:
        try:
            module = import_module(value)
            module_result.append(module.getAnalysis(id))
        except AttributeError:
            pass
    return module_result
