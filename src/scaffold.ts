import type { SmartGithubTree } from "@aerofoil/core/soft/lazyGitTree/Github";
import type { ServerCore } from "@aerofoil/logger";
// import { child } from "~/child";

export async function main({
	logger,
	selfGitTree,
	projectGitTree,
}: {
	logger: ServerCore;
	selfGitTree: SmartGithubTree;
	projectGitTree: SmartGithubTree;
}) {
	const assetTree = await selfGitTree.getEntry("/assets");
	if (!assetTree.success || assetTree.value.type !== "tree") {
		logger.error("No asset folder found");
		throw new Error("No asset folder found");
	}
	logger.info("Adding assets folder");
	await projectGitTree.addTree(await assetTree.value.retriveFullTree());
	await projectGitTree.commit("Add assets folder");
	logger.success("Added assets folder");
}
