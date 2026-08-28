---
title: Reinforcement Learning
date: 2026-07-07
tags:
  - seed
aliases:
  - RL
---

> How to get models to be more good and less bad

A post-training technique to tweak the model parameters by maximizing reward relative to some reward function.

## Terminology

- At every step of interaction, the agent sees a (possibly partial) observation $o$ of the state $s$ of the world, and then decides on an action $a_t$ from the action space to take.
	- The agent also perceives a reward signal from the environment, a number that tells it how good or bad the current world state is.
	- The goal of the agent is to maximize its cumulative reward, called return: $R(\tau) = \sum_t \gamma^t r_t$, where $\gamma < 1$ makes later reward count for less.
- The policy $\pi_\theta$ is the thing being trained. For a language model the policy is just the model, and sampling the next token is taking an action.
	- A trajectory (also rollout, or episode) is one full sequence of states and actions. For an LLM this is usually a single prompt and its completion.
	- On-policy vs off-policy is whether the data you are training on came from the current policy. On-policy is more stable but much more expensive, since you have to re-sample after every update.
- The value function $V(s)$ is the expected return from state $s$ if you keep following the current policy. $Q(s, a)$ is the same thing but conditioned on taking action $a$ first.
	- Advantage $A(s, a) = Q(s, a) - V(s)$ is how much better an action was than what the policy would have done on average. Subtracting a baseline cuts variance without changing the gradient in expectation, which is why almost everything below optimizes advantage rather than raw reward.
	- Credit assignment is working out which actions in a long trajectory earned the reward. Hard for LLMs, because the reward usually arrives once, at the end of a long completion.
- Where the reward comes from:
	- A reward model is a learned scorer trained on preference comparisons, standing in for a reward function nobody can write down directly.
	- A verifiable reward comes from a checker instead: tests pass, the proof compiles, the answer matches. Harder to hack, but only available in a narrow set of domains.
- What goes wrong:
	- Reward hacking, where the policy finds high-reward behaviour that doesn't satisfy the thing you actually wanted. See [[thoughts/Goodhart's Law]].
	- Entropy collapse, where the policy gets more confident over training, sampling gets less diverse, and exploration stops. See [[thoughts/entropy]].
	- A KL penalty against the reference (pre-RL) model is the usual guard, since without it the policy walks off toward wherever the reward model happens to be broken.

## Policy gradient (REINFORCE)

- $\nabla_\theta J = \mathbb{E}[\nabla_\theta \log \pi_\theta(a \mid s) \, A(s, a)]$. Raise the log-probability of actions that did better than baseline, lower it for the ones that did worse.
	- Very high variance on its own, so most of what follows is variance reduction and stability machinery bolted on top.

## PPO

- Clips the importance ratio $\pi_\theta / \pi_{\theta_\text{old}}$ to $[1 - \epsilon, 1 + \epsilon]$, so one large advantage can't blow up the policy in a single update.
- Needs a separate value network (the critic) to estimate $V(s)$, so roughly twice the parameters in memory during training.
- The default for RLHF for several years, including InstructGPT. A lot of surface to tune: value head, GAE, clip range, KL coefficient.

## GRPO

- Drops the critic. Sample a group of $G$ completions for the same prompt and use the group's own reward statistics as the baseline: $A_i = (r_i - \text{mean}(r)) / \text{std}(r)$.
	- Cheaper for that reason, and it fits verifiable rewards well, since all you need per completion is a scalar.
	- Known failure modes are length bias, and the std normalization inflating advantage on groups where every sample scored about the same.
- From DeepSeekMath, and what DeepSeek-R1 was trained with.

## DPO

- Skips the RL loop. Derives a closed-form loss over preference pairs with the same optimum as the KL-constrained RLHF objective, so you train directly on (chosen, rejected) with no sampling.
	- Cheap and stable, but off-policy against a fixed dataset, so it can only reweight behaviour that already appears in the data.

## Rejection sampling and best-of-$n$

- Sample $n$ completions, keep the ones a scorer likes, fine-tune on those. Expert iteration, STaR, and RAFT are versions of this.
- Not really RL, but a strong baseline and usually the first thing that works.

## RLHF vs RLVR

- RLHF takes reward from a preference-trained reward model. Applies to anything, but the reward model is a learned approximation and is the part that gets hacked.
- RLVR takes reward from a checker. Much narrower coverage, but the signal doesn't degrade the harder you push on it.

See also: [[thoughts/gradient descent]], [[thoughts/LLMs]], [[thoughts/AI alignment]], [[thoughts/regularization]]
