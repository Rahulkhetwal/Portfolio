import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(
    page_title="Rahul Khetwal - Portfolio",
    page_icon="👨‍💻",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide Streamlit header/footer
hide_streamlit_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            header {visibility: hidden;}
            </style>
            """
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

# Embed your existing portfolio
st.components.v1.iframe(
    src="https://your-netlify-or-vercel-url.vercel.app",  # Replace with your deployed URL
    width="100%",
    height=800,
    scrolling=True
)
