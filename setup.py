from setuptools import setup, find_packages

setup(
    name="portfolio",
    version="1.0.0",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'streamlit>=1.0.0',
        'python-dotenv>=0.19.0',
    ],
    entry_points={
        'console_scripts': [
            'serve-portfolio=serve:main',
        ],
    },
    data_files=[
        ('', ['serve.py']),
        ('dist', ['dist/index.html']),
    ],
    python_requires='>=3.7',
)
