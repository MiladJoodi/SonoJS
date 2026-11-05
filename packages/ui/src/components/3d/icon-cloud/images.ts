import typescript from "./images/typescript.svg"
import javascript from "./images/javascript.svg"
import dart from "./images/dart.svg"
import java from "./images/java.svg"
import react from "./images/react.svg"
import flutter from "./images/flutter.svg"
import android from "./images/android.svg"
import html5 from "./images/html5.svg"
import css3 from "./images/css3.svg"
import nodedotjs from "./images/nodedotjs.svg"
import express from "./images/express.svg"
import nextdotjs from "./images/nextdotjs.svg"
import prisma from "./images/prisma.svg"
import amazonaws from "./images/amazonaws.svg"
import postgresql from "./images/postgresql.svg"
import firebase from "./images/firebase.svg"
import nginx from "./images/nginx.svg"
import vercel from "./images/vercel.svg"
import testinglibrary from "./images/testinglibrary.svg"
import jest from "./images/jest.svg"
import cypress from "./images/cypress.svg"
import docker from "./images/docker.svg"
import git from "./images/git.svg"
import jira from "./images/jira.svg"
import github from "./images/github.svg"
import gitlab from "./images/gitlab.svg"
import visualstudiocode from "./images/visualstudiocode.svg"
import androidstudio from "./images/androidstudio.svg"
import sonarqube from "./images/sonarqube.svg"
import figma from "./images/figma.svg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Local Simple Icons set shipped beside the component (no CDN at runtime). */
export const defaultIconCloudImages: string[] = [
  typescript,
  javascript,
  dart,
  java,
  react,
  flutter,
  android,
  html5,
  css3,
  nodedotjs,
  express,
  nextdotjs,
  prisma,
  amazonaws,
  postgresql,
  firebase,
  nginx,
  vercel,
  testinglibrary,
  jest,
  cypress,
  docker,
  git,
  jira,
  github,
  gitlab,
  visualstudiocode,
  androidstudio,
  sonarqube,
  figma,
].map(assetSrc)
