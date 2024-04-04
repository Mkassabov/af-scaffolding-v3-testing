import { child } from "~/child";

export async function main({ logger, selfGitTree, projectGitTree }) {
	logger.debug("Hello from scaffold.ts");
	logger.debug(child());
}
