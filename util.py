import importlib.util
from importlib import import_module
import pathlib
import os


def call_all_getAnalysis_methods():
    current_directory = pathlib.Path('analyze_tools')
    current_pattern = "*.py"
    modules = []
    for current_file in current_directory.glob(current_pattern):
        path = str(current_file)
        path = path.replace('\\', '.')
        print(path)
        modules.append(path)
    print(modules)
    for value in modules:
        print(value)
        module = __import__("analyze_tools.Slackingggg")

call_all_getAnalysis_methods()
