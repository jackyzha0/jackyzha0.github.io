---
title: "DSCI 100"
date: 2020-04-23T00:00:29-04:00
---

# Textbook Notes

**classification →** i.e., predicting a categorical class (sometimes called a label) for an observation given its other quantitative variables (sometimes called features).

**“training set”:** because we use these observations to train, or teach, our classifier so that we can use it to make predictions on new data that we have not seen previously.

**class imbalance →** when one label is much more common than another. For the present purposes, it will suffice to rebalance the data by oversampling the rare class. In other words, we will replicate rare observations multiple times in our data set to give them more voting power in the K-nearest neighbour algorithm.

**prediction accuracy →** This is the fraction of examples for which the classifier made the correct prediction

**underfit** **→** if the model isn’t influenced enough by the training data, it is said to underfit the data. (in KNN this happens when K large)

**overfit →** if the model is influenced too much by the training data, it is said to overfit the data. (in KNN this happens when K small)

**regression →** Regression, like classification, is a predictive problem setting where we want to use past information to predict future observations. But in the case of regression, the goal is to predict numerical values instead of class labels.

Use `scale` for multivariate data (for KNN)

Use `as.factor()` for labels when doing classification

**Strengths of k-nn regression**

1.  Simple and easy to understand
2.  No assumptions about what the data must look like
3.  Works well with non-linear relationships (i.e., if the relationship is not a straight line)

**Limitations of k-nn regression**

1.  As data gets bigger and bigger, k-nn gets slower and slower, quite quickly
2.  Does not perform well with a large number of predictors unless the size of the training set is exponentially larger
3.  Does not predict well beyond the range of values input in your training data

```r
# accuracy plot
accuracies <- model$results # where model is the result of train()
accuracy_vs_k <- ggplot(accuracies, aes(x = k, y = Accuracy)) +
  geom_point() +
  geom_line()
accuracy_vs_k
```

```r
Y_test_predicted <- predict(object = model_knn, X_test)
model_quality <- confusionMatrix(data = Y_test_predicted, reference = Y_test)
```

```r
# upsampling example
rare_cancer <- upSample(x = select(rare_cancer, Perimeter, Concavity),
            y = select(rare_cancer, Class) %>% unlist())
```

```r
library(forcats) # helps to manipulate factors in r
```

```r
# top 5 closest things
new_obs <- data.frame(<COL_1>, etc.)

dataset %>% select(<COL_NAMES>) %>% 
  mutate(dist_from_new = sqrt((<COL_1> - new_obs$<COL_1>)^2  + (<COL_2> - newobs$<COL_2>)^2)) %>% 
  arrange(dist_from_new) %>% 
  head(n = 5) # choose top n
```

## Types of ML
**supervised learning** → data has labels with a predictive target (class or value) and will use this data to help make predictions on unseen data

classification → predicting target class

regression → prediction some numerical value

**unsupervised learning** → give unlabelled data, find structure or patterns in the data

clustering → grouping similar data together

useful for EDA / developing new questions about the data / and using subgroups to improve models

within-cluster-sum-of-squared-distances (WSSD) → for each group

1.  compute the center/mean of that group
2.  compute distance from mean to every point
3.  square then add them all together

total WSSD → add all the WSSD for each cluster

## Common Operations

```r
# splitting dataset (e.g. 60% split)
training_rows <- dataset %>% 
	select(<SOME_COL>) %>%
  unlist() %>%
  createDataPartition(p = 0.6, list = FALSE)

train <- dataset %>%
	slice(training_rows)
test <- dataset %>%
	slice(-training_rows)

X_train <- train %>% select(<TRAIN_COLS>) %>% data.frame()
X_test <- test %>% select(<TRAIN_COLS>)
Y_train <- train %>% select(<PRED_COLS>) %>% unlist()
Y_test <- test %>% select(<PRED_COLS>) %>% unlist()
```

```r
# ggpairs scatterplot of all the columns we are interested in including in our model
options(repr.plot.height = 4, repr.plot.width = 10)
pairs_plot <- ggpairs(train, mapping = aes(alpha = 0.4))

# (textbook method)
pairs_plot <- dataset %>% 
    slice(training_rows) %>% 
    ggpairs(mapping = aes(alpha = 0.4))

```

```r
# fitting a linear regression model
lm_model <- train(x = X_train, 
                      y = Y_train, 
                      method = "lm")
```

```r
# table of regression slopes/coefficients
lm_coeffs <- lm_model$finalModel$coefficients %>% # select coefficients from final model
    t() %>% # transpose
    data.frame() # back to df
colnames(lm_coeffs)[1] <- "Intercept" # rename col
```

```r
# RMSE (root mean squared error) -> calculated on X_train / Y_train
train_pred <- predict(lm_model, X_train)
lm_modelvalues <- data.frame(obs = Y_train, pred = train_pred)
lm_rmse <- defaultSummary(lm_modelvalues)[[1]]

# RMSPE (root mean squared prediction error) -> calculated on X_test / Y_test
test_pred <- predict(lm_model, X_test)
lm_modelvalues <- data.frame(obs = Y_test, pred = test_pred)
lm_rmspe <- defaultSummary(lm_modelvalues)[[1]]
```

```r
# knn version

# compute/apply scaling and shifting
scale_transformer <- preProcess(X_train, method = c("center", "scale")) 
X_train <- predict(scale_transformer, X_train)
X_test <- predict(scale_transformer, X_test)

#train knn model using 5-fold CV
train_control <- trainControl(method = "cv", number = 5) # n-fold CV
k_lots = data.frame(k = seq(from = 1, to = 20, by = 1)) # define which Ks
knn_reg_cv_5 <- train(x = X_train, 
                      y = Y_train, 
                      method = "knn", 
                      tuneGrid = k_lots, 
                      trControl = train_control)

# get best k with lowest RMSE
best_k = knn_reg_cv_5$results %>% 
    arrange(RMSE) %>% 
    slice(1) %>% 
    select(k)

#retrain the model using that final k, predict on held-out data
knn_mult_reg_final <- train(x = X_train, y = Y_train, method = "knn", tuneGrid = best_k)
test_pred <- predict(knn_mult_reg_final, X_test)
modelvalues <- data.frame(obs = Y_test, pred = test_pred)
knn_mult_test_results <- defaultSummary(modelvalues)
knn_rmspe <- knn_mult_test_results[[1]]
```

## R Documentation

```r
# unlist
# flattens something
vector <- db %>% unlist()
```

```r
# mutate
# adds a new variable based on prev variables
data <- data %>% 
mutate(new_var = old_var/2)
```

```r
# select
# create a subset of the dataframe with selected cols
data <- data %>% 
select(col1, col2)
```

```r
# filter
# keeps only rows that satisfy criteria
data <- data %>% 
filter(var == "some_val")
```

```r
# gather
# key: name of new column
# value: name of new column
# ...: columns to collapse
# collapse which col into key column
# collapses value into value column
data <- data %>% 
gather(key = "key", value="value", col1, col2)
```

```r
# group_by
# creates "groups" of rows according to some column property
data <- data %>% 
group_by(col_name)
```

```r
# summarize
# good for stats after you use group_by
# creates new data frame
data <- data %>% 
group_by(some_col) %^%
summarize(new_stat = min(some_other_col))
```

```r
# arrange
# sorts low to high, use desc to sort high to low
data <- data %>% arrange(col_name)
```

```r
# map_df
# applies a function to each column
data <- data %>% 
map_df(max)
```

# Tidy data

data frame → rectangle where the rows are observations and columns are variables

satisfies

1.  each row is a single observation
2.  each column is a single variable (e.g. no combined values like ratios)
3.  each value is a single cell (i.e. row and column position is unique)

COLUMNS SHOULD NOT STORE DATA (e.g. winner and runnerup should not be in separate columns)

Top 5 reasons why datasets are messy
-   Column headers are values, not variable names.
-   Multiple variables are stored in one column.
-   Variables are stored in both rows and columns.
-   Multiple types of observational units are stored in the same table.
-   A single observational unit is stored in multiple tables.

[https://tidyr.tidyverse.org/articles/tidy-data.html](https://tidyr.tidyverse.org/articles/tidy-data.html)

# k-means
## k-means clustering

1.  pick some k
2.  assign data to k different clusters randomly
3.  iterate
    1.  center update → calculate average for each cluster (using euclidian distance)
    2.  label update → re-assign the data to the closest cluster center
    3.  if no labels changed, finish (model has converged)

picking k

-   choose elbow of total wssd vs k → i.e. not much increase by going from k to k+1

explaining weird bumps

-   k-means can get stuck in a bad local minimum (poor solution) → will find a bad clustering
-   fix → restart it a few times and pick the clustering with the lowest WSSD

Advantages

-   easy to implement and interpret
-   simple to understand
-   computationally more efficient than other clustering algorithms

Disadvantages

-   need to specify K
-   dependent on initialization
-   sensitive to scale of features (need to normalize/standardize)

## k-means

```r
# get actual cluster model
clust <- kmeans(some_data, centers = 3)

# augment turns model + data to dataframe
clust_df <- augment(clust, some_data)

# plot k-means
clust_plot <- ggplot(clust_df, aes(x = some_var, y = another_var, colour = .cluster)) +
  geom_point() +
  labs(x = 'some_var', y = 'another_var', colour = 'Cluster')

# get elbow stats
elbow_stats <- tibble(k = 1:10) %>%
  mutate(pokemon_clusters = map(k, ~kmeans(pm_numeric_data, nstart = 10, .x)),
         glanced = map(pokemon_clusters, glance)) %>%
  select(-pokemon_clusters) %>%
  unnest(glanced)

# elbow plot
elbow_plot <- ggplot(clust_ks, aes(x = k, y = tot.withinss)) +
  geom_point() +
  geom_line() +
  xlab("K") +
  ylab("Total within-cluster sum of squares")+
  scale_x_continuous(breaks = 1:10)
```

K-means, unlike the classification and regression models we studied in previous chapters, can get “stuck” in a bad solution. For example, if we were unlucky and initialized K-means with the following labels. To solve this problem when clustering data using K-means, we should randomly re-initialize the labels a few times, run K-means for each initialization, and pick the clustering that has the lowest final total WSSD.

## Code examples of k-means

```r
set.seed(1234)
data_clust <- kmeans(data, centers = 3) # k = 3

# labels original data with clusters
clustered_data <- augment(data_clust, marketing_data)

# plotting result
cluster_plot <- ggplot(clustered_data, aes(x = <>, y = <>, colour = .cluster), size=2) +
  geom_point() +
  labs(x = '<>', y = '<>', colour = 'Cluster')

cluster_plot

# getting total WSSD
glance(data_clust)

## # A tibble: 1 x 4
##   totss tot.withinss betweenss  iter
##   <dbl>        <dbl>     <dbl> <int>
## 1  253.         41.8      211.     2

# total WSSD for a variety of Ks
clust_ks <- tibble(k = 1:9) %>%
  mutate(clusts = map(k, ~kmeans(data, .x)),
         glanced = map(clusts , glance)) 
head(clust_ks)

## # A tibble: 6 x 3
##       k marketing_clusts glanced         
##   <int> <list>           <list>          
## 1     1 <kmeans>         <tibble [1 × 4]>
## 2     2 <kmeans>         <tibble [1 × 4]>
## 3     3 <kmeans>         <tibble [1 × 4]>
## 4     4 <kmeans>         <tibble [1 × 4]>
## 5     5 <kmeans>         <tibble [1 × 4]>
## 6     6 <kmeans>         <tibble [1 × 4]>
```

# Inference
**statistical inference** → using a sample to make conclusions about the wider population where the sample was drawn from

allow us to make statements like: based on the results of the latest pole, we estimate that 47.2% of all Americans think that firearms should have strong regulations or restrictions when thinking about gun ownership rights and gun laws

A/B testing → which design will lead to higher customer engagement

randomly select a subset of the population (the sample) and ask. calculate a proportion using the sample to estimate the true population proportion

## Bootstrap sampling
Uses the sample distribution as an estimate of the population distribution. **bootstrapping** is a resampling procedure that uses data from our one sample to generate a sampling distribution by repeatedly taking random samples from the known sample with replacement

generating a bootstrap sample

1.  randomly draw a bootstrap sample from the original sample with replacement
2.  record bootstrap point estimate from the bootstrap sample
3.  repeat 1 and 2 many times to create a bootstrap distribution
4.  calculate the plausible range of values around our observed point estimate (confidence interval)

bootstrap sample is centered around the original sample's mean

will not improve the quality of our estimate

spread of sampling and bootstrap distributions are about the same

—

* **point_estimate** → a single number calculated from a random sample that estimates an unknown population parameter of interest
* **population** → the entire set of entities/objects of interest
* **random sampling** → selecting a subset of observations from a population where each observation is equally likely to be selected at any point during the selection process
* **representative sampling** → selecting a subset of observations from a population where the sample’s characteristics are a good representation of the population’s characteristics
* **population parameter** → a numerical summary value about the population 
* **sample** → a collection of observations from a population
* **observation** → a quantity or a quality (or set of these) we collect from a given entity/object
* **sampling distribution** → a distribution of point estimates, where each point estimate was calculated from a different random sample from the same population

```r
# generate a population of size sample_size with p percent category B
population_size <- 10000
p <- 0.67
population <- tibble(id = seq(1, population_size, by=1),
								 color = factor(rbinom(population_size, 1, p),
								 labels = c("A", "B")))
```

```r
# sanity check to check proportions
population %>% 
group_by(color) %>%
summarize(n = n(),
					proportion = n() / population_size)
```

```r
# draw a single sample
sample_size <- 40
samples_1 <- rep_sample_n(population, size = sample_size, reps = 1)

# alternate for if above doens't work
one_sample <- can_seniors %>% 
    rep_sample_n(40) %>% 
    ungroup() %>% # ungroup the data frame 
    select(age) # drop the replicate column

# get proportions
props <- summarize(samples_1, n = sum(color == "B"),
									 prop = sum(color == "B") / sample_size)
```

```r
# histogram of sample
pop_dist <- ggplot(can_seniors, aes(x = age)) + 
   geom_histogram(binwidth = 1) +
   xlab("Age of senior") +
   ggtitle("Population distribution")
```

```r
# calculate population parameters
pop_parameters <- can_seniors %>%
summarize(pop_mean = mean(age),
          pop_med = median(age),
          pop_sd = sd(age))

# calculate point estimates from sample (pretty much same code)
sample_1_estimates <- sample_1 %>%
summarize(sample_1_mean = mean(age),
          sample_1_med = median(age),
          sample_1_sd = sd(age))
```

The mean of the distribution of the bootstrap sample means is not the same value as the mean of the sampling distribution of the sample means because the bootstrap samples were drawn from the sample, whereas the samples that were used to create the sampling distribution were drawn from the population.

```r
# 95% confidence interval
boot1000_means %>% 
    select(mean) %>% 
    pull() %>% 
    quantile(c(0.025, 0.975))

# conclude
# Our sample mean age for Canadian seniors was measured to 
# be 77.8 years, and we’re 95% “confident” that the true 
# population mean for Canadian seniors is between (73.7, 82.0).
```

```r
# all in one
sampling_distribution_5 <- coffee_data %>%
rep_sample_n(size = 5, reps = 1500) %>%
group_by(replicate) %>%
summarize(sample_mean = mean(cups)) %>%
ggplot(aes(x = sample_mean)) + 
   geom_histogram(binwidth = 1) +
   xlab("Number of cups of coffe") +
   ggtitle("Distribution of sample means")
```